import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-input-score',
    imports: [FormsModule],
    templateUrl: './input-score.component.html',
    styleUrl: './input-score.component.css'
})
export class InputScoreComponent<T extends string | number = number> implements OnInit, OnChanges {
  @Input() name: string = '';
  @Input() initValue: T | undefined;
  @Input() min: number | undefined;
  @Input() max: number | undefined;
  @Input() inc: number = 1;
  @Input() values: T[] | undefined;

  value: T = 0 as unknown as T;

  @Output() valueChange = new EventEmitter<T>();

  ngOnInit() {
    this.initializeValue();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initValue'] || changes['values']) {
      this.initializeValue();
    }
  }

  private initializeValue() {
    if (this.values && this.values.length > 0) {
      this.value = this.initValue !== undefined ? this.initValue : this.values[0];
    } else if (this.initValue !== undefined) {
      this.value = this.initValue;
    } else {
      this.value = 0 as unknown as T;
    }
  }

  decrement() {
    if (this.values && this.values.length > 0) {
      const currentIndex = this.values.indexOf(this.value);
      if (currentIndex > 0) {
        this.updateValue(this.values[currentIndex - 1]);
      }
    } else if (typeof this.value === 'number') {
      const step = this.inc ?? 1;
      if (this.min === undefined || this.value - step >= this.min) {
        this.updateValue((this.value - step) as unknown as T);
      }
    }
  }

  increment() {
    if (this.values && this.values.length > 0) {
      const currentIndex = this.values.indexOf(this.value);
      if (currentIndex < this.values.length - 1) {
        this.updateValue(this.values[currentIndex + 1]);
      }
    } else if (typeof this.value === 'number') {
      const step = this.inc ?? 1;
      if (this.max === undefined || this.value + step <= this.max) {
        this.updateValue((this.value + step) as unknown as T);
      }
    }
  }

  private updateValue(newValue: T) {
    this.value = newValue;
    this.valueChange.emit(this.value);
  }

  disabledMin(): boolean {
    if (this.values && this.values.length > 0) {
      return this.value === this.values[0];
    }
    return (typeof this.value === 'number' && this.min !== undefined)
      ? this.value <= this.min
      : false;
  }

  disabledMax(): boolean {
    if (this.values && this.values.length > 0) {
      return this.value === this.values[this.values.length - 1];
    }
    return (typeof this.value === 'number' && this.max !== undefined)
      ? this.value >= this.max
      : false;
  }

  reinit(value: T) {
    this.value = value;
  }
}
