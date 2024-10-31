import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

type UserColumn = {
  position: number;
  user: User;
}

type CountRoundRow = {
  user: UserColumn
  value: number;
}

@Component({
  selector: 'app-winner',
  standalone: true,
  imports: [CommonModule],
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
