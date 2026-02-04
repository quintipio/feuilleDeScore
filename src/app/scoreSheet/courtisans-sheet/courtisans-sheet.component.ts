import { CommonModule } from '@angular/common';
import { Component, inject, QueryList, ViewChild, ViewChildren, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { InputScoreComponent } from '../../components/input-score/input-score.component';
import { WinnerComponent } from '../../components/winner/winner.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '../../service/table.service';
import { Table } from '../../models/table.model';
import { CountRoundRow } from '../../models/sheet';
import { formatDateNowToKey } from '../../Utils/Utils';

interface CourtisansPlayer {
  user: any;
  mission1: boolean;
  mission2: boolean;
  rossignol: number;
  lievre: number;
  crapaud: number;
  abeille: number;
  cerf: number;
  carpe: number;
  score: number;
  scoreTotal: number;
}

@Component({
  selector: 'app-courtisans-sheet',
  standalone: true,
  imports: [CommonModule, InputScoreComponent, WinnerComponent],
  templateUrl: './courtisans-sheet.component.html',
  styleUrl: './courtisans-sheet.component.css'
})
export class CourtisansSheetComponent implements AfterViewInit {
  @ViewChild(WinnerComponent) winnerComponent: WinnerComponent | undefined;
  @ViewChildren(InputScoreComponent) inputScores: QueryList<InputScoreComponent> | undefined;

  private tableService = inject(TableService);
  private cdr = inject(ChangeDetectorRef);

  table: Table | undefined;

  game: { players: CourtisansPlayer[] } | undefined;
  winnerAlreadyOpen = false;

  // Table de la reine
  familles = ['Rossignol', 'Lièvre', 'Crapaud', 'Abeille', 'Cerf', 'Carpe'];
  famillesState: { [key: string]: string } = {
    'Rossignol': 'lumière',
    'Lièvre': 'lumière',
    'Crapaud': 'lumière',
    'Abeille': 'lumière',
    'Cerf': 'lumière',
    'Carpe': 'lumière'
  };

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      const idTable = +params['idTable'];
      if (idTable) {
        this.tableService.getTable(idTable).subscribe({
          next: (table: Table | undefined) => {
            if (table) {
              this.table = table;
              const newGame = this.initializeGame();
              this.loadGame(newGame);
            }
          },
          error: (error) => {
            console.error("Error fetching table:", error);
          }
        });
      }
    });
  }

  private loadGame(gameToOpen: { players: CourtisansPlayer[] }){
    this.game = gameToOpen;
    this.inputScores?.forEach((input) => {
      input.reinit(0);
    });
    // Forcer la détection de changements après le chargement du jeu
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

  ngAfterViewInit() {
    // Réinitialiser les composants après que les vues soient complètement chargées
    setTimeout(() => {
      this.inputScores?.forEach((input) => {
        input.ngOnInit();
      });
      this.cdr.detectChanges();
    }, 100);
  }

  private initializeGame(){
    const newGame = { players: [] as CourtisansPlayer[] };
    this.table?.users.forEach((player) => {
      const courtisansPlayer: CourtisansPlayer = {
        user: player,
        mission1: false,
        mission2: false,
        rossignol: 0,
        lievre: 0,
        crapaud: 0,
        abeille: 0,
        cerf: 0,
        carpe: 0,
        score: 0,
        scoreTotal: 0
      };
      newGame.players.push(courtisansPlayer);
    });
    return newGame;
  }

  private calculateScore(player: CourtisansPlayer){
    player.score = 0;

    // Points pour les missions (3 points chacune)
    if (player.mission1) player.score += 3;
    if (player.mission2) player.score += 3;

    // Points pour les familles
    const familleKeys = ['rossignol', 'lievre', 'crapaud', 'abeille', 'cerf', 'carpe'];
    const familleNames = ['Rossignol', 'Lièvre', 'Crapaud', 'Abeille', 'Cerf', 'Carpe'];

    familleKeys.forEach((key, index) => {
      const count = player[key as keyof CourtisansPlayer] as number;
      const state = this.famillesState[familleNames[index]];

      if (state === 'lumière') {
        player.score += count;
      } else if (state === 'disgrace') {
        player.score -= count;
      }
    });

    player.scoreTotal = player.score;
  }

  changeFamilleState(famille: string, value: string) {
    this.famillesState[famille] = value;
    // Recalculer les scores de tous les joueurs
    this.game?.players.forEach(player => {
      this.calculateScore(player);
    });
  }

  toggleMission1(player: CourtisansPlayer, checked: boolean){
    player.mission1 = checked;
    this.calculateScore(player);
  }

  toggleMission2(player: CourtisansPlayer, checked: boolean){
    player.mission2 = checked;
    this.calculateScore(player);
  }

  changeRossignol(player: CourtisansPlayer, value: number){ player.rossignol = value; this.calculateScore(player); }
  changeLievre(player: CourtisansPlayer, value: number){ player.lievre = value; this.calculateScore(player); }
  changeCrapaud(player: CourtisansPlayer, value: number){ player.crapaud = value; this.calculateScore(player); }
  changeAbeille(player: CourtisansPlayer, value: number){ player.abeille = value; this.calculateScore(player); }
  changeCerf(player: CourtisansPlayer, value: number){ player.cerf = value; this.calculateScore(player); }
  changeCarpe(player: CourtisansPlayer, value: number){ player.carpe = value; this.calculateScore(player); }

  canShowEndGame(){
    return !!(this.table && this.table.game);
  }

  openWinner(){
    if(!this.winnerAlreadyOpen){
      const data = JSON.stringify(this.game);
      this.table!.specificData = data;
      this.tableService.updateTable(this.table!).subscribe({ next: () => {}, error: (e) => console.error('Error update table:', e) });
    }
    this.winnerAlreadyOpen = true;
    this.winnerComponent?.loadWinners(this.generateRound());
  }

  private generateRound(): CountRoundRow[]{
    const winners: CountRoundRow[] = [];
    this.game!.players.forEach((player) => {
      const winner: CountRoundRow = { value: player.scoreTotal, user: { user: player.user, position: 0 } };
      winners.push(winner);
    });
    winners.sort((a,b) => b.value - a.value);
    winners.forEach((w, i) => { w.user.position = i+1; });
    return winners;
  }

  closeGame(){
    this.table!.specificData = "";
    this.table!.round = [];
    this.table!.historic[formatDateNowToKey()] = this.generateRound();
    this.tableService.updateTable(this.table!).subscribe({ next: () => { this.router.navigate(["/tables"]); }, error: (error) => { console.error("Error update table:", error); } });
  }
}
