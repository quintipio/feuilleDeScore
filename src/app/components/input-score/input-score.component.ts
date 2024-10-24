import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-score',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-score.component.html',
  styleUrl: './input-score.component.css'
})
export class InputScoreComponent {
  @Input() name: string = '';
  value: number = 0;

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  decrement() {
    this.value--;
    this.valueChange.emit(this.value);
  }

  increment() {
    this.value++;
    this.valueChange.emit(this.value);
  }

  onInputChange(event: any) {
    const inputValue = event.target.value;
    if (!isNaN(inputValue) && inputValue !== '') {
      this.value = parseInt(inputValue, 10);
    } else {
      this.value = 0;
    }
    this.valueChange.emit(this.value);
  }
}
