import { CommonModule } from '@angular/common';
import { Component, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputScoreComponent } from '../../components/input-score/input-score.component';
import { WinnerComponent } from '../../components/winner/winner.component';
import { TableService } from '../../service/table.service';
import { Table } from '../../models/table.model';
import { User } from '../../models/user.model';
import { CountRoundRow, RoundRow } from '../../models/sheet';

type PixiesPlayer = {
  user: User,
  spirales: number,
  croix: number,
  zone: number,
  scoreTotal: number,
  scoreManche: number,
  valideUn: boolean,
  valideDeux: boolean,
  valideTrois: boolean,
  valideQuatre: boolean,
  valideCinq: boolean,
  valideSix: boolean,
  valideSept: boolean,
  valideHuit: boolean,
  valideNeuf: boolean,
}

type PixiesManche = {
  manche: number,
  players: PixiesPlayer[]
}

@Component({
  selector: 'app-pixies-sheet',
  standalone: true,
  imports: [CommonModule, InputScoreComponent, WinnerComponent],
  templateUrl: './pixies-sheet.component.html',
  styleUrl: './pixies-sheet.component.css'
})
export class PixiesSheetComponent {
  @ViewChild(WinnerComponent) winnerComponent: WinnerComponent | undefined;
  @ViewChildren(InputScoreComponent) inputScores: QueryList<InputScoreComponent> | undefined;

  private tableService = inject(TableService);

  table: Table | undefined;
  partie : PixiesManche | undefined;
  winnerAlreadyOpen = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
    this.table?.game?.mancheLimite
    this.route.queryParams.subscribe(params => {
      const idTable = +params['idTable'];
      if (idTable) {
        this.tableService.getTable(idTable).subscribe({
          next: (table: Table | undefined) => {
            if (table) {
              this.table = table;
              if (this.table?.specificData !== undefined && this.table.specificData !== "") {
                console.log("Partie en cours");
                const lastManche = JSON.parse(this.table.specificData) as PixiesManche;
                console.log(lastManche);
                const newManche = this.newManche(lastManche.manche+1);
                newManche.players.forEach((player) => {
                  const tmp = lastManche.players.find(newPlayer => newPlayer.user.id === player.user.id);
                  player.scoreTotal = tmp!.scoreTotal;
                });
                console.log(newManche);
                this.openNewManche(newManche);

              } else {
                console.log("Nouvelle partie");
                const newPartie = this.newManche(1);
                this.openNewManche(newPartie);
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

  private openNewManche(mancheToOpen: PixiesManche) {
    this.partie = mancheToOpen;
    this.inputScores?.forEach((input) => {
      input.reinit(0);
    });
  }

  private newManche(numberManche : number) : PixiesManche {
    const newPartie: PixiesManche = {
      manche : numberManche,
      players: []
    }
    this.table?.users.forEach((player) => {
      const pixiesPlayer : PixiesPlayer = {
        spirales : 0,
        croix : 0,
        zone : 0,
        valideUn : false,
        valideDeux : false,
        valideTrois : false,
        valideQuatre : false,
        valideCinq : false,
        valideSix : false,
        valideSept : false,
        valideHuit : false,
        valideNeuf : false,
        scoreManche : 0,
        scoreTotal : 0,
        user : player
      }
      newPartie.players.push(pixiesPlayer);
    });
    return newPartie;
  }

  private saveManche() {
    var data = JSON.stringify(this.partie);
    const round: RoundRow = {
      row : this.partie!.manche,
      points : []
    };
    this.partie?.players.forEach((player) => {
      const joueur: CountRoundRow= {
        user : {user : player.user, position : 0},
        value : player.scoreTotal
      }
      round.points.push(joueur);
    });
    this.table?.round.push(round);
    this.table!.specificData = data;
    this.tableService.updateTable(this.table!).subscribe({
      next: () => {
        return;
      },
      error: (error) => {
        console.error("Error update table:", error);
      }
    });
  }

  private calculerScoreMancheEnCours(player : PixiesPlayer){
    player.scoreManche = 0;
    player.scoreManche = player.spirales;
    player.scoreManche -= player.croix;
    player.scoreManche += (player.zone * (this.partie!.manche+1));

    if(player.valideUn){
      player.scoreManche +=  + 1;
    }
    if(player.valideDeux){
      player.scoreManche +=  + 2;
    }
    if(player.valideTrois){
      player.scoreManche +=  + 3;
    }
    if(player.valideQuatre){
      player.scoreManche +=  + 4;
    }
    if(player.valideCinq){
      player.scoreManche +=  + 5;
    }
    if(player.valideSix){
      player.scoreManche +=  + 6;
    }
    if(player.valideSept){
      player.scoreManche +=  + 7;
    }
    if(player.valideHuit){
      player.scoreManche +=  + 8;
    }
    if(player.valideNeuf){
      player.scoreManche +=  + 9;
    }
  }

  mancheSuivante(){
    this.partie!.players.forEach((player) => {
      player.scoreTotal += player.scoreManche;
    });
    this.saveManche();
    const newManche = this.newManche(this.partie!.manche+1);
    newManche.players.forEach((player) => {
      const tmp = this.partie!.players.find(newPlayer => newPlayer.user.id === player.user.id);
      player.scoreTotal = tmp!.scoreTotal;
    });
    this.openNewManche(newManche);
  }

  changeSpirale(player: PixiesPlayer, value: number) {
    player.spirales = value;
    this.calculerScoreMancheEnCours(player);
  }

  changeCroix(player: PixiesPlayer, value: number) {
    player.croix = value;
    this.calculerScoreMancheEnCours(player);
  }

  changeZone(player: PixiesPlayer, value: number) {
    player.zone = value;
    this.calculerScoreMancheEnCours(player);
  }

  changeCartevalide(player: PixiesPlayer, value: number) {
    if(value === 1){
      player.valideUn = !player.valideUn;
    }
    if(value === 2){
      player.valideDeux = !player.valideDeux;
    }
    if(value === 3){
      player.valideTrois = !player.valideTrois;
    }
    if(value === 4){
      player.valideQuatre = !player.valideQuatre;
    }
    if(value === 5){
      player.valideCinq = !player.valideCinq;
    }
    if(value === 6){
      player.valideSix = !player.valideSix;
    }
    if(value === 7){
      player.valideSept = !player.valideSept;
    }
    if(value === 8){
      player.valideHuit = !player.valideHuit;
    }
    if(value === 9){
      player.valideNeuf = !player.valideNeuf;
    }
    this.calculerScoreMancheEnCours(player);
  }

  canShowEndGame(){
    if(this.table && this.partie && this.table.game){
      return this.partie!.manche >= this.table!.game?.mancheLimite;
    } else {
      return false;
    }
  }


  openWinner() {
    if(!this.winnerAlreadyOpen){
      this.partie!.players.forEach((player) => {
        player.scoreTotal += player.scoreManche;
      });
    }
    this.winnerAlreadyOpen = true;
    const winners: CountRoundRow[] = []
    this.partie!.players.forEach((player) => {
      const winner : CountRoundRow = {
        value : player.scoreTotal,
        user : {user : player.user, position : 0},
      }
      winners.push(winner);
    });

    winners.sort((a, b) => b.value - a.value);
    winners.forEach((winner, index) => {
      winner.user.position = index + 1;
    });
    this.winnerComponent?.loadWinners(winners);
  }

  closeGame() {
    this.router.navigate(["/tables"]);
  }

}
