import { Component, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Table } from '../../models/table.model';
import { TableService } from '../../service/table.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WinnerComponent } from '../../components/winner/winner.component';
import { User } from '../../models/user.model';
import { InputScoreComponent } from '../../components/input-score/input-score.component';
import { CountRoundRow, RoundRow, UserColumn } from '../../models/sheet';
import { SkullKingConf } from '../../games/config-game/spec/skull-king-config/skull-king-config.component';
import { formatDateNowToKey } from '../../Utils/Utils';



type skullKingPlayer = {
  user: User,
  pari: number,
  pliGagne: number,
  poingferme: boolean,
  scoreManche: number,
  bonusAutre: number,
  bonusButin: number,
  bonusSkullKing: number,
  bonusSirene: number,
  bonusPirate: number,
  bonusSecond: number,
  bonusLeviathan: number,
  bonusDix: number
}

type SkullKingRound = {
  manche: number;
  players: skullKingPlayer[]
}

@Component({
    selector: 'app-skull-king-sheet',
    imports: [CommonModule, InputScoreComponent, WinnerComponent],
    templateUrl: './skull-king-sheet.component.html',
    styleUrl: './skull-king-sheet.component.css'
})
export class SkullKingSheetComponent {
  @ViewChild(WinnerComponent) winnerComponent: WinnerComponent | undefined;
  @ViewChildren(InputScoreComponent) inputScores: QueryList<InputScoreComponent> | undefined;

  private tableService = inject(TableService);

  table: Table | undefined;

  mancheEnCours: SkullKingRound | undefined;
  histoManche: { [id: string]: SkullKingRound } = {};
  numbers: number[] = [];

  alwaysScore = false;
  rascalScore = false;
  rascalPoing = false;
  extension = false;
  mancheToPlay: number[] = [];
  cursorMancheToPlay: number = 0;
  winners : CountRoundRow[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const idTable = +params['idTable'];
      if (idTable) {
        this.tableService.getTable(idTable).subscribe({
          next: (table: Table | undefined) => {
            if (table) {
              this.table = table;
              this.loadSpecificConf(table.game!.specificConf);
              if (this.table?.specificData !== undefined && this.table.specificData !== "") {
                console.log("Partie en cours");
                this.histoManche = JSON.parse(this.table.specificData);
                const maxId = Object.keys(this.histoManche).map(key => parseInt(key)).reduce((max, current) => (current > max ? current : max), -Infinity);
                this.cursorMancheToPlay = this.mancheToPlay.indexOf(maxId);
                this.cursorMancheToPlay = (this.cursorMancheToPlay === -1 ? 0 : this.cursorMancheToPlay)
                this.openManche(maxId);
              } else {
                console.log("Nouvelle partie");
                this.cursorMancheToPlay = 0;
                this.histoManche[this.mancheToPlay[this.cursorMancheToPlay]] = this.newRound(this.mancheToPlay[this.cursorMancheToPlay]);
                this.openManche(this.mancheToPlay[this.cursorMancheToPlay]);
              }
            }
          },
          error: (error) => {
            console.error("Error fetching table:", error);
          }
        });
      }
    });
  }

  private loadSpecificConf(specificConf: string) {
    const data = JSON.parse(specificConf) as SkullKingConf;
    this.alwaysScore = data.alwaysScore;
    this.rascalScore = data.rascalScore;
    this.rascalPoing = data.rascalPoing;
    this.extension = data.extension;
    this.mancheToPlay = data.manche.sort((a, b) => a - b);

  }

  private newRound(manche: number): SkullKingRound {
    const newManche: SkullKingRound = {
      "manche": manche,
      "players": [],
    }
    this.table!.users.forEach((userRow) => {
      const player: skullKingPlayer = {
        user: userRow,
        pari: 0,
        pliGagne: 0,
        poingferme: false,
        scoreManche: 0,
        bonusAutre: 0,
        bonusButin: 0,
        bonusSkullKing: 0,
        bonusSirene: 0,
        bonusPirate: 0,
        bonusDix: 0,
        bonusSecond: 0,
        bonusLeviathan: 0
      }
      newManche.players.push(player);
    })
    return newManche;
  }

  private openManche(mancheToOpen: number) {
    this.mancheEnCours = this.histoManche[mancheToOpen.toString()];
    this.numbers = this.numbers = Array.from({ length: this.mancheEnCours.manche + 1 }, (_, i) => i);
    this.mancheEnCours.players.forEach((player) => {
      this.inputScores?.forEach((input) => {
        if (input.name === "bonusCarteMax_" + player.user.id) {
          input.reinit(player.bonusDix);
        }
        if (input.name === "bonusSirene_" + player.user.id) {
          input.reinit(player.bonusSirene)
        }
        if (input.name === "bonusPirate_" + player.user.id) {
          input.reinit(player.bonusPirate)
        }
        if (input.name === "bonusSkullKing_" + player.user.id) {
          input.reinit(player.bonusSkullKing)
        }
        if (input.name === "bonusButin_" + player.user.id) {
          input.reinit(player.bonusButin)
        }
        if (input.name === "bonusAutre_" + player.user.id) {
          input.reinit(player.bonusAutre)
        }
        if (input.name === "bonusSecond_" + player.user.id) {
          input.reinit(player.bonusSecond)
        }
        if (input.name === "bonusLeviathan_" + player.user.id) {
          input.reinit(player.bonusLeviathan)
        }
      });
      this.calculerScoreManche(player);
    });
  }

  private calculerScoreManche(player: skullKingPlayer) {
    var newScore = 0;
    if (this.rascalScore) {
      const dif = Math.abs(player.pari - player.pliGagne);
      if (dif === 0 || dif === 1) {
        var multiplicateur = (!this.rascalPoing || (this.rascalPoing && !player.poingferme) ? 10 : 15);
        if (dif === 0 || (dif === 1 && !this.rascalPoing) ||  (dif === 1 && this.rascalPoing && !player.poingferme)) {
          newScore = this.mancheEnCours!.manche * multiplicateur;
          newScore += player.bonusAutre;
          newScore += player.bonusButin * 20;
          newScore += player.bonusSkullKing * 40;
          newScore += player.bonusPirate * 20;
          newScore += player.bonusSirene * 30;
          newScore += player.bonusDix * 10;
        }
      }

      if (dif === 1 && newScore !== 0) {
        newScore = newScore / 2;
      }
    } else {
      if (player.pari > 0) {
        const dif = Math.abs(player.pari - player.pliGagne);
        if (dif === 0) {
          newScore = player.pliGagne * 20;
          newScore += player.bonusAutre;
          newScore += player.bonusButin * 20;
          newScore += player.bonusSkullKing * 40;
          newScore += player.bonusPirate * 20;
          newScore += player.bonusSirene * 30;
          newScore += player.bonusDix * 10;
          newScore += player.bonusSecond * 30;
          newScore += player.bonusLeviathan * 20;
        } else {
          newScore += dif * -10;
          if(this.alwaysScore){
            newScore += player.bonusAutre;
            newScore += player.bonusButin * 20;
            newScore += player.bonusSkullKing * 40;
            newScore += player.bonusPirate * 20;
            newScore += player.bonusSirene * 30;
            newScore += player.bonusDix * 10;
            newScore += player.bonusSecond * 30;
            newScore += player.bonusLeviathan * 20;
          }
        }
      } else {
        if (player.pari == player.pliGagne) {
          newScore += this.mancheEnCours?.manche! * 10;
          newScore += player.bonusAutre;
          newScore += player.bonusButin * 20;
          newScore += player.bonusSkullKing * 40;
          newScore += player.bonusPirate * 20;
          newScore += player.bonusSirene * 30;
          newScore += player.bonusDix * 10;
          newScore += player.bonusSecond * 30;
          newScore += player.bonusLeviathan * 20;
        } else {
          newScore += this.mancheEnCours?.manche! * -10;
          if(this.alwaysScore){
            newScore += player.bonusAutre;
            newScore += player.bonusButin * 20;
            newScore += player.bonusSkullKing * 40;
            newScore += player.bonusPirate * 20;
            newScore += player.bonusSirene * 30;
            newScore += player.bonusDix * 10;
            newScore += player.bonusSecond * 30;
            newScore += player.bonusLeviathan * 20;
          }
        }
      }
    }

    player.scoreManche = newScore;
  }

  private saveManche() {
    this.histoManche[this.mancheEnCours!.manche.toString()] = this.mancheEnCours!;
    this.table!.round = this.genererHistoRound();

    this.table!.specificData = JSON.stringify(this.histoManche);
    this.tableService.updateTable(this.table!).subscribe({
      next: () => {
      },
      error: (error) => {
        console.error("Error update table:", error);
      }
    });
  }



  private genererHistoRound(): RoundRow[] {
    var round: RoundRow[] = [];
    for (const id in this.histoManche) {
      if (this.histoManche.hasOwnProperty(id)) {
        const data = this.histoManche[id];
        const roundRow: RoundRow = {
          "row": data.manche,
          "points": this.convertPlayerToCountRoundRow(data.players)
        }
        round.push(roundRow);
      }
    }
    return round;
  }

  private convertPlayerToCountRoundRow(players: skullKingPlayer[]): CountRoundRow[] {
    const retour: CountRoundRow[] = [];
    players.forEach((player) => {
      const countRoundRow: CountRoundRow = {
        "value": player.scoreManche,
        "user": {
          position: 1,
          user: player.user
        }
      }
      retour.push(countRoundRow);
    });
    return retour;
  }

  getScoreTotal(playerToFind: skullKingPlayer): number {
    let retour = 0;
    for (const key in this.histoManche) {
      if (this.histoManche.hasOwnProperty(key) && Number(key) < this.mancheEnCours!.manche) {
        this.histoManche[key].players.forEach((player) => {
          if (player.user.id === playerToFind.user.id) {
            retour += player.scoreManche;
          }
        });
      }
    }
    return retour;
  }

  isSelectedPari(player: skullKingPlayer, num: number) {
    return player.pari === num;
  }

  changePari(player: skullKingPlayer, num: number) {
    player.pari = num;
    this.calculerScoreManche(player);
  }

  isSelectedScore(player: skullKingPlayer, num: number) {
    return player.pliGagne === num;
  }

  changeScore(player: skullKingPlayer, num: number) {
    player.pliGagne = num;
    this.calculerScoreManche(player);
  }

  getBonusAutre(player: skullKingPlayer, value: number) {
    player.bonusAutre = value;
    this.calculerScoreManche(player);
  }

  getBonusButin(player: skullKingPlayer, value: number) {
    player.bonusButin = value;
    this.calculerScoreManche(player);
  }

  getBonusSkullKing(player: skullKingPlayer, value: number) {
    player.bonusSkullKing = value;
    this.calculerScoreManche(player);
  }

  getBonusSirene(player: skullKingPlayer, value: number) {
    player.bonusSirene = value;
    this.calculerScoreManche(player);
  }

  getBonusPirate(player: skullKingPlayer, value: number) {
    player.bonusPirate = value;
    this.calculerScoreManche(player);
  }

  getBonusDix(player: skullKingPlayer, value: number) {
    player.bonusDix = value;
    this.calculerScoreManche(player);
  }

  getSecond(player: skullKingPlayer, value: number) {
    player.bonusSecond = value;
    this.calculerScoreManche(player);
  }

  getLeviathan(player: skullKingPlayer, value: number) {
    player.bonusLeviathan = value;
    this.calculerScoreManche(player);
  }

  changePoing(player: skullKingPlayer) {
    player.poingferme = !player.poingferme
    this.calculerScoreManche(player)
  }

  mancheSuivante() {
    this.saveManche();
    this.cursorMancheToPlay = this.cursorMancheToPlay + 1;
    var mancheToPlay = this.mancheToPlay[this.cursorMancheToPlay];
    if (!this.histoManche.hasOwnProperty(mancheToPlay)) {
      this.histoManche[mancheToPlay] = this.newRound(mancheToPlay);
    }
    this.openManche(mancheToPlay);
  }

  manchePrecedente() {
    this.saveManche();
    this.cursorMancheToPlay = this.cursorMancheToPlay - 1;
    var mancheToPlay = this.mancheToPlay[this.cursorMancheToPlay];
    this.openManche(mancheToPlay);
  }

  canGoBack(): boolean {
    return this.cursorMancheToPlay > 0;
  }

  isFinish(): boolean {
    return this.cursorMancheToPlay == this.mancheToPlay.length - 1;
  }

  openWinner() {
    this.saveManche();
    const userSums: { [userId: string]: { user: UserColumn, totalValue: number } } = {};

    this.table!.round.forEach((roundRow) => {
      roundRow.points.forEach((countRoundRow) => {
        const userId = countRoundRow.user.user.id;
        const value = countRoundRow.value;

        if (userSums[userId]) {
          userSums[userId].totalValue += value;
        } else {
          userSums[userId] = { user: countRoundRow.user, totalValue: value };
        }
      });
    });

    const winners: CountRoundRow[] = Object.keys(userSums).map(userId => ({
      user: userSums[userId].user,
      value: userSums[userId].totalValue
    }));

    winners.sort((a, b) => b.value - a.value);
    winners.forEach((winner, index) => {
      winner.user.position = index + 1;
    });
    this.winners = winners
    this.winnerComponent?.loadWinners(winners);
  }

  closeGame() {
    this.table!.historic[formatDateNowToKey()] = this.winners;
    this.table!.specificData = "";
    this.table!.round = [];
    this.tableService.updateTable(this.table!).subscribe({
      next: () => {
        this.router.navigate(["/tables"]);
      },
      error: (error) => {
        console.error("Error update table:", error);
      }
    });
  }
}
