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
  @Input() initValue : number | undefined;
  @Input() min : number | undefined;
  @Input() max : number | undefined;
  @Input() inc : number | undefined;
  value: number = 0;

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(){
    if(this.initValue !== undefined){
      this.value = this.initValue;
    }
  }

  decrement() {
    if(this.inc == undefined){
      this.inc = 1;
    }
    if(this.min == undefined || this.value-1 >= this.min){
      this.value = this.value-this.inc;
      this.valueChange.emit(this.value);
    }
  }

  increment() {
    if(this.inc == undefined){
      this.inc = 1;
    }
    if(this.max == undefined || this.value+1 <= this.max){
      this.value = this.value+this.inc;
      this.valueChange.emit(this.value);
    }
  }

  disabledMin() {
    return (this.min !== undefined)?this.value <= this.min:false;
  }

  disabledMax() {
    return (this.max !== undefined)?this.value >= this.max:false;
  }

  reinit(value : number){
    this.value = value;
  }
}
