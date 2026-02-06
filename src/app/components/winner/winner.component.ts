import { Component, EventEmitter, Output } from '@angular/core';

import { CountRoundRow } from '../../models/sheet';

@Component({
    selector: 'app-winner',
    imports: [],
    templateUrl: './winner.component.html',
    styleUrl: './winner.component.css'
})
export class WinnerComponent {

  winners:CountRoundRow[] = [];
  @Output() outWindow = new EventEmitter<void>();

  loadWinners(winners: CountRoundRow[]){
    console.log(winners);
    this.winners =winners;
  }

  onClose(){
    this.outWindow.emit();
  }
}
