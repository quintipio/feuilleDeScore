
import { Component, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { InputScoreComponent } from '../../components/input-score/input-score.component';
import { WinnerComponent } from '../../components/winner/winner.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '../../service/table.service';
import { Table } from '../../models/table.model';
import { CountRoundRow } from '../../models/sheet';
import { formatDateNowToKey } from '../../Utils/Utils';

@Component({
    selector: 'app-symbiose-sheet',
    imports: [InputScoreComponent, WinnerComponent],
    templateUrl: './symbiose-sheet.component.html',
    styleUrl: './symbiose-sheet.component.css'
})
export class SymbioseSheetComponent {
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
      const symbiosePlayer = {
        user: player,
        carte1: 0,
        carte2: 0,
        carte3: 0,
        carte4: 0,
        carte5: 0,
        carte6: 0,
        carte7: 0,
        carte8: 0,
        score: 0,
        scoreTotal: 0
      };
      newGame.players.push(symbiosePlayer);
    });
    return newGame;
  }

  private calculateScore(player: any){
    player.score = 0;
    player.score += (player.carte1 ?? 0);
    player.score += (player.carte2 ?? 0);
    player.score += (player.carte3 ?? 0);
    player.score += (player.carte4 ?? 0);
    player.score += (player.carte5 ?? 0);
    player.score += (player.carte6 ?? 0);
    player.score += (player.carte7 ?? 0);
    player.score += (player.carte8 ?? 0);
    player.scoreTotal = player.score;
  }

  changecarte(player: any, index: number, value: number){
    const carteKey = `carte${index}`;
    player[carteKey] = value;
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
