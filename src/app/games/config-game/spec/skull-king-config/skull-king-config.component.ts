import { CommonModule, JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type SkullKingConf = {
  alwaysScore: boolean;
  rascalScore: boolean;
  rascalPoing: boolean;
  extension: boolean;
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
  isAlwaysScore = false;
  isExtensionChecked = false;

  ngOnChanges(){
    if(this.specificConfIn !== undefined){
      const data = JSON.parse(this.specificConfIn) as SkullKingConf;
      this.isAlwaysScore = data.alwaysScore;
      this.isRascalScoreChecked = data.rascalScore;
      this.isRascalScorePoingChecked = data.rascalPoing;
      this.isExtensionChecked = data.extension;
      this.checkedValues = data.manche;
      this.isOkForSave = this.checkedValues.length > 0;
    }
  }

  onCheckboxModeScoringChange(name: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (name === 'rascalScore') {
      this.isRascalScoreChecked = isChecked;
      if(!isChecked){
        this.isRascalScorePoingChecked = false;
      }
    } else if (name === 'rascalScorePoing') {
      this.isRascalScorePoingChecked = isChecked;
    } else if(name === 'alwaysScore') {
      this.isAlwaysScore = isChecked;
    } else if(name === 'extension') {
      this.isExtensionChecked = isChecked;
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
    this.checkedValues = this.checkedValues.sort((a, b) => a - b);

    this.isOkForSave = this.checkedValues.length > 0;
    if(this.isOkForSave){
      this.generateSpecificConf()
    }
    this.okForSave.emit(this.isOkForSave);
  }

  generateSpecificConf(){
    const data: SkullKingConf = {
      alwaysScore: this.isAlwaysScore,
      rascalScore: this.isRascalScoreChecked,
      rascalPoing : this.isRascalScorePoingChecked,
      extension: this.isExtensionChecked,
      manche : this.checkedValues.sort((a, b) => a - b)
    }
    console.log(data.manche);
    var retour = JSON.stringify(data);
    this.specificConfOut.emit(retour);
  }

}
