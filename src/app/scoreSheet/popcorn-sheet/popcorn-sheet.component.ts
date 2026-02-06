
import { Component, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { InputScoreComponent } from '../../components/input-score/input-score.component';
import { WinnerComponent } from '../../components/winner/winner.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '../../service/table.service';
import { Table } from '../../models/table.model';
import { CountRoundRow } from '../../models/sheet';
import { formatDateNowToKey } from '../../Utils/Utils';

@Component({
    selector: 'app-popcorn-sheet',
    imports: [InputScoreComponent, WinnerComponent],
    templateUrl: './popcorn-sheet.component.html',
    styleUrl: './popcorn-sheet.component.css'
})
export class PopcornSheetComponent {
  @ViewChild(WinnerComponent) winnerComponent: WinnerComponent | undefined;
  @ViewChildren(InputScoreComponent) inputScores: QueryList<InputScoreComponent> | undefined;

  private tableService = inject(TableService);

  table: Table | undefined;

  game: { players: any[] } | undefined;
  winnerAlreadyOpen = false;

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

  private loadGame(gameToOpen: { players:any[] }){
    this.game = gameToOpen;
    this.inputScores?.forEach((input) => {
      input.reinit(0);
    });
  }

  private initializeGame(){
    const newGame = { players: [] as any[] };
    this.table?.users.forEach((player) => {
      const popcornPlayer = {
        user: player,
        nombrePopcorn: 0,
        argentRestant: 0,
        pointsLabels: 0,
        tropheesCount: 0,
        score: 0,
        scoreTotal: 0
      };
      newGame.players.push(popcornPlayer);
    });
    return newGame;
  }

  private calculateScore(player: any){
    player.score = 0;
    player.score += (player.nombrePopcorn ?? 0);
    player.score += Math.floor((player.argentRestant ?? 0) / 5);
    player.score += (player.pointsLabels ?? 0);
    player.score += (player.tropheesCount ?? 0);
    player.scoreTotal = player.score;
  }

  changeNombrePopcorn(player: any, value: number){
    player.nombrePopcorn = value;
    this.calculateScore(player);
  }

  changeArgentRestant(player: any, value: number){
    player.argentRestant = value;
    this.calculateScore(player);
  }

  changePointsLabels(player: any, value: number){
    player.pointsLabels = value;
    this.calculateScore(player);
  }

  changeTrophees(player: any, value: number){
    player.tropheesCount = value;
    this.calculateScore(player);
  }

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
