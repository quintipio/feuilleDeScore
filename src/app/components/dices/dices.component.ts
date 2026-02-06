
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-dices',
    imports: [],
    templateUrl: './dices.component.html',
    styleUrl: './dices.component.css'
})
export class DicesComponent {
  @Input() maxRolls: number = 0;
  @Input() numberOfDice: number = 1;
  @Output() diceRolled = new EventEmitter<number[]>();

  currentRoll: number = 0;
  diceValues: number[] = [];
  diceSelected: boolean[] = [];

  constructor() {
    this.initializeDice();
  }
  ngOnInit() {
    this.initializeDice();
  }

  initializeDice(): void {
    this.diceValues = Array(this.numberOfDice).fill(0);
    this.diceSelected = Array(this.numberOfDice).fill(false);
    this.currentRoll = 0;
  }

  rollDice(): void {
    if (this.maxRolls === 0 || this.currentRoll < this.maxRolls) {
      this.diceValues = this.diceValues.map((value, index) =>
        this.diceSelected[index] ? value : Math.floor(Math.random() * 6) + 1
      );
      this.currentRoll++;
      this.diceRolled.emit(this.diceValues);
    }
  }

  toggleDiceSelection(index: number): void {
    this.diceSelected[index] = !this.diceSelected[index];
  }

  hasDiceValues(): boolean {
    return this.diceValues.some(value => value !== 0);
  }

  getImageName(value: number): string {
    const names = ['un', 'deux', 'trois', 'quatre', 'cinq', 'six'];
    return value > 0 && value <= 6 ? `${names[value - 1]}.png` : '';
  }

  canRoll(): boolean {
    return this.maxRolls === 0 || this.currentRoll < this.maxRolls;
  }

  getSelectedDiceValues(): number[] {
    return this.diceValues.filter((_, index) => this.diceSelected[index]);
  }
}
