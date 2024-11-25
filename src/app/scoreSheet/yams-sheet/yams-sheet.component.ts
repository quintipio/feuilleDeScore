import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WinnerComponent } from '../../components/winner/winner.component';

@Component({
  selector: 'app-yams-sheet',
  standalone: true,
  imports: [CommonModule, WinnerComponent],
  templateUrl: './yams-sheet.component.html',
  styleUrl: './yams-sheet.component.css'
})
export class YamsSheetComponent {

  players: string[] = ['Joueur 1', 'Joueur 2'];
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
    'Yam',
    'Chance',
  ];
  scores: { [player: string]: { [category: string]: number | null } } = {};
  locked: { [player: string]: { [category: string]: boolean } } = {};
  dice: number[] = [1, 1, 1, 1, 1];
  gameOver = false;
  winnersMessage: string = '';

  constructor() {
    this.players.forEach((player) => {
      this.scores[player] = {};
      this.locked[player] = {};
      this.categories.forEach((category) => {
        this.scores[player][category] = null;
        this.locked[player][category] = false;
      });
    });
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
  }

  checkGameOver(): void {
    this.gameOver = this.players.every(player =>
      this.categories.every(category => this.locked[player][category])
    );

    if (this.gameOver) {
      const playerScores = this.players.map(player => ({
        name: player,
        total: this.getTotal(player)
      }));

      playerScores.sort((a, b) => b.total - a.total);

      this.winnersMessage = playerScores
        .map((player, index) => `${index + 1}. ${player.name} - ${player.total} points`)
        .join(' | ');
    }
  }


  isActivePlayer(player: string): boolean {
    return this.players[this.activePlayerIndex] === player;
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
          return brelanValue * 3;
        }
        return 0;
      case 'Carré':
        const carreValue = counts.findIndex(count => count >= 4);
        if (carreValue !== -1) {
          return carreValue * 4;
        }
        return 0;
      case 'Full':
        const threeOfAKind = counts.findIndex(count => count >= 3);
        const twoOfAKind = counts.findIndex(count => count >= 2);
        if (threeOfAKind !== -1 && twoOfAKind !== -1 && threeOfAKind !== twoOfAKind) {
          return 25;
        }
        return 0;
      case 'Petite Suite':
        return [1, 2, 3, 4].every((n) => counts[n]) || [2, 3, 4, 5].every((n) => counts[n]) || [3, 4, 5, 6].every((n) => counts[n]) ? 30 : 0;
      case 'Grande Suite':
        return [1, 2, 3, 4, 5].every((n) => counts[n]) || [2, 3, 4, 5, 6].every((n) => counts[n]) ? 40 : 0;
      case 'Yam':
        return counts.some((count) => count === 5) ? 50 : 0;
      case 'Chance':
        return this.dice.reduce((sum, die) => sum + die, 0);
      default:
        return 0;
    }
  }


  getBonus(player: string): string {
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
    const activePlayer = this.players[this.activePlayerIndex];
    this.locked[activePlayer][category] = false;
  }

  lockScore(category: string): void {
    const activePlayer = this.players[this.activePlayerIndex];
    if (this.scores[activePlayer][category] === null) {
      this.scores[activePlayer][category] = this.calculatePoints(category);
    }
    this.locked[activePlayer][category] = true;
    this.checkGameOver();
  }

  getTotal(player: string): number {
    let total = Object.values(this.scores[player])
      .filter(score => score !== null)
      .reduce((total, score) => total + (score as number), 0);
    const bonus = this.getBonus(player).startsWith('35 ') ? 35 : 0;
    return total + bonus;
  }
}
