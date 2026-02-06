import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { WinnerComponent } from '../../components/winner/winner.component';
import { TableService } from '../../service/table.service';
import { Table } from '../../models/table.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { CountRoundRow, RoundRow, UserColumn } from '../../models/sheet';
import { formatDateNowToKey } from '../../Utils/Utils';
import { DicesComponent } from '../../components/dices/dices.component';
@Component({
    selector: 'app-yams-sheet',
    imports: [CommonModule, WinnerComponent, DicesComponent],
    templateUrl: './yams-sheet.component.html',
    styleUrl: './yams-sheet.component.css'
})
export class YamsSheetComponent {

  @ViewChild(WinnerComponent) winnerComponent: WinnerComponent | undefined;
  @ViewChild(DicesComponent) dicesComponent: DicesComponent | undefined;
  private tableService = inject(TableService);
  table: Table | undefined;

  players: User[] = [];
  activePlayerIndex = 0;
  categories: string[] = [
    'As',
    'Deux',
    'Trois',
    'Quatre',
    'Cinq',
    'Six',
    'Brelan',
    'Carré',
    'Full',
    'Petite Suite',
    'Grande Suite',
    'Yathzee',
    'Chance',
  ];
  scores: { [player: string]: { [category: string]: number | null } } = {};
  locked: { [player: string]: { [category: string]: boolean } } = {};
  dice: number[] = [1, 1, 1, 1, 1];
  gameOver = false;
  winnersMessage: string = '';
  desVirtuel: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.table?.game?.mancheLimite
    this.route.queryParams.subscribe(params => {
      const idTable = +params['idTable'];
      if (idTable) {
        this.tableService.getTable(idTable).subscribe({
          next: (table: Table | undefined) => {
            if (table) {
              this.table = table;
              if (this.table?.specificData !== undefined && this.table.specificData !== "") {
                this.loadGame();

              } else {
                this.players = table.users;
                this.players.forEach((player) => {
                  this.scores[player.id] = {};
                  this.locked[player.id] = {};
                  this.categories.forEach((category) => {
                    this.scores[player.id][category] = null;
                    this.locked[player.id][category] = false;
                  });
                });
              }

            }
          },
        });
      }
    });
  }

  private saveGame() {
    if (this.table) {
      const specificData = [this.scores, this.locked, this.players, this.activePlayerIndex, this.dice];
      this.table.specificData = JSON.stringify(specificData);
      this.table.round = this.getRound(false);
      this.tableService.updateTable(this.table).subscribe({
        next: () => {
        },
      });
    }
  }

  private getRound(tri: boolean): RoundRow[] {

    const points: CountRoundRow[] = [];
    this.players.forEach((user) => {
      const joueur: UserColumn = {
        position: 0,
        user: user
      }
      points.push({
        user: joueur,
        value: this.getTotal(user.id)
      })
    });

    if (tri) {
      points.sort((a, b) => b.value - a.value);
      points.forEach((winner, index) => {
        winner.user.position = index + 1;
      });
    }

    const data: RoundRow[] = [];
    const element: RoundRow = {
      row: 1,
      points: points
    };

    data.push(element);
    return data;
  }


  private loadGame() {
    if (this.table) {
      const data = JSON.parse(this.table.specificData);
      this.scores = data[0];
      this.locked = data[1];
      this.players = data[2];
      this.activePlayerIndex = data[3];
      this.dice = data[4];
    }
  }

  changeDiceValue(data: number[]) {
    this.dice = data;
  }

  toggleButtonsDes(): void {
    this.desVirtuel = !this.desVirtuel;
  }

  calculatePoints(category: string): number {
    const counts = Array(7).fill(0);
    this.dice.forEach((die) => counts[die]++);

    switch (category) {
      case 'As':
        return counts[1] * 1;
      case 'Deux':
        return counts[2] * 2;
      case 'Trois':
        return counts[3] * 3;
      case 'Quatre':
        return counts[4] * 4;
      case 'Cinq':
        return counts[5] * 5;
      case 'Six':
        return counts[6] * 6;
      case 'Brelan':
        const brelanValue = counts.findIndex(count => count >= 3);
        if (brelanValue !== -1) {
          return this.dice.reduce((sum, die) => sum + die, 0);
        }
        return 0;
      case 'Carré':
        const carreValue = counts.findIndex(count => count >= 4);
        if (carreValue !== -1) {
          return this.dice.reduce((sum, die) => sum + die, 0);
        }
        return 0;
      case 'Full':
        const threeOfAKind = counts.findIndex(count => count === 3);
        const twoOfAKind = counts.findIndex(count => count === 2);
        if (threeOfAKind !== -1 && twoOfAKind !== -1 && threeOfAKind !== twoOfAKind) {
          return 25;
        }
        return 0;
      case 'Petite Suite':
        return [1, 2, 3, 4].every((n) => counts[n]) || [2, 3, 4, 5].every((n) => counts[n]) || [3, 4, 5, 6].every((n) => counts[n]) ? 30 : 0;
      case 'Grande Suite':
        return [1, 2, 3, 4, 5].every((n) => counts[n]) || [2, 3, 4, 5, 6].every((n) => counts[n]) ? 40 : 0;
      case 'Yathzee':
        return counts.some((count) => count === 5) ? 50 : 0;
      case 'Chance':
        return this.dice.reduce((sum, die) => sum + die, 0);
      default:
        return 0;
    }
  }

  getDieImage(value: number): string {
    switch (value) {
      case 1:
        return 'un.png';
      case 2:
        return 'deux.png';
      case 3:
        return 'trois.png';
      case 4:
        return 'quatre.png';
      case 5:
        return 'cinq.png';
      case 6:
        return 'six.png';
      default:
        return 'un.png';
    }
  }


  setDieValue(index: number, value: number): void {
    this.dice[index] = value;
  }

  updateDice(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const face = parseInt(input.value, 10);
    this.dice[index] = isNaN(face) ? 1 : Math.min(6, Math.max(1, face));
  }

  updateScore(event: Event, player: string, category: string): void {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    this.scores[player][category] = isNaN(value) ? null : value;
  }

  changePlayer(direction: 'left' | 'right') {
    if (direction === 'left') {
      this.activePlayerIndex = (this.activePlayerIndex - 1 + this.players.length) % this.players.length;
    } else {
      this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
    }
    this.dice = [1, 1, 1, 1, 1]
    this.dicesComponent?.initializeDice();
    this.saveGame();
  }

  checkGameOver(): void {
    this.gameOver = this.players.every(player =>
      this.categories.every(category => this.locked[player.id][category])
    );

    if (this.gameOver) {
      const winners = this.getRound(true)[0].points;
      this.winnerComponent?.loadWinners(winners);
    }
  }


  isActivePlayer(player: number): boolean {
    return this.players[this.activePlayerIndex].id === player;
  }

  getBonus(player: number): string {
    const bonusCategories = ['As', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six'];
    let totalUpperSection = 0;

    totalUpperSection = bonusCategories.reduce((sum, category) => {
      const score = this.scores[player][category] || 0;
      return sum + score;
    }, 0);

    const pointsRemaining = 63 - totalUpperSection;

    if (totalUpperSection >= 63) {
      return `35 points`;
    } else {
      return `-${pointsRemaining} points`;
    }
  }



  unlockScore(category: string): void {
    const activePlayer = this.players[this.activePlayerIndex].id;
    this.locked[activePlayer][category] = false;
  }

  private checkYathzeeAlreadyGagne(activePlayer: number): boolean {
    if (this.scores[activePlayer]["Yathzee"] !== null && this.scores[activePlayer]["Yathzee"] >= 50) {
      const counts = Array(7).fill(0);
      this.dice.forEach((die) => counts[die]++);
      return counts.some((count) => count === 5);
    }
    return false;
  }

  lockScore(category: string): void {
    const activePlayer = this.players[this.activePlayerIndex].id;
    if(this.scores[activePlayer]["Yathzee"] != null && this.checkYathzeeAlreadyGagne(activePlayer)){
      this.scores[activePlayer]["Yathzee"] += 100;
    }
    if (this.scores[activePlayer][category] === null) {
      this.scores[activePlayer][category] = this.calculatePoints(category);
    }
    this.locked[activePlayer][category] = true;
    this.checkGameOver();
  }

  getTotal(player: number): number {
    let total = Object.values(this.scores[player])
      .filter(score => score !== null)
      .reduce((total, score) => total + (score as number), 0);
    const bonus = this.getBonus(player).startsWith('35 ') ? 35 : 0;
    return total + bonus;
  }

  closeGame() {
    this.table!.specificData = "";
    this.table!.round = [];
    this.table!.historic[formatDateNowToKey()] = this.getRound(true)[0].points;
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
