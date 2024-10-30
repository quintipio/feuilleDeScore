
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input-pad',
  standalone: true,
  imports: [],
  templateUrl: './input-pad.component.html',
  styleUrls: ['./input-pad.component.css']
})
export class InputPadComponent {
  @Output() valueChange = new EventEmitter<number>();
  @Output() close = new EventEmitter<void>();

  displayValue: string = '';


  openInput(value: number) {
    if (value && value != 0){
      this.displayValue = value.toString();
    } else {
      this.displayValue = "0";
    }
  }

  onNumberClick(num: string) {
    if(this.displayValue === "0"){
      this.displayValue = num;
    } else {
      this.displayValue += num;
    }
  }

  onToggleSign() {
    if (this.displayValue.startsWith('-')) {
      this.displayValue = this.displayValue.slice(1);
    } else {
      this.displayValue = '-' + this.displayValue;
    }
  }

  onDelete() {
    if (this.displayValue.length > 0) {
      this.displayValue = this.displayValue.slice(0, -1);
    }
    if(this.displayValue === ""){
      this.displayValue = "0";
    }
  }

  onClose() {
    this.close.emit();
  }

  onValidate() {
    if(!this.displayValue || this.displayValue == ""){
      this.displayValue = "0";
    }
    const numberValue = parseInt(this.displayValue);
    this.valueChange.emit(numberValue);
  }
}
