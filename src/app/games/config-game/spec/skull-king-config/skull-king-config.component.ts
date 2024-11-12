import { CommonModule, JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type SkullKingConf = {
  rascalScore: boolean;
  rascalPoing: boolean;
  manche: number[];
}

@Component({
  selector: 'app-skull-king-config',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skull-king-config.component.html',
  styleUrl: './skull-king-config.component.css'
})
export class SkullKingConfigComponent {

  @Input() specificConfIn : string | undefined;
  @Output() okForSave: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() specificConfOut: EventEmitter<string> = new EventEmitter<string>();

  values = Array.from({ length: 10 }, (_, i) => i + 1);

  isOkForSave = false;

  checkedValues: number[] = [];
  isRascalScoreChecked = false;
  isRascalScorePoingChecked = false;

  ngOnChanges(){
    if(this.specificConfIn !== undefined){
      const data = JSON.parse(this.specificConfIn) as SkullKingConf;
      this.isRascalScoreChecked = data.rascalScore;
      this.isRascalScorePoingChecked = data.rascalPoing;
      this.checkedValues = data.manche;
      this.isOkForSave = this.checkedValues.length > 0;
    }
  }

  onCheckboxModeScoringChange(name: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (name === 'rascalScore') {
      this.isRascalScoreChecked = isChecked;
    } else if (name === 'rascalScorePoing') {
      this.isRascalScorePoingChecked = isChecked;
    }

    if(this.isOkForSave){
      this.generateSpecificConf()
    }
    this.okForSave.emit(this.isOkForSave);
  }

  onCheckboxChange(value: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.checkedValues.push(value);
    } else {
      this.checkedValues = this.checkedValues.filter(val => val !== value);
    }

    this.isOkForSave = this.checkedValues.length > 0;
    if(this.isOkForSave){
      this.generateSpecificConf()
    }
    this.okForSave.emit(this.isOkForSave);
  }

  generateSpecificConf(){
    const data: SkullKingConf = {
      rascalScore: this.isRascalScoreChecked,
      rascalPoing : this.isRascalScorePoingChecked,
      manche : this.checkedValues
    }
    var retour = JSON.stringify(data);
    this.specificConfOut.emit(retour);
  }

}
