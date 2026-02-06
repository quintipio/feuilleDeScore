import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Table } from '../../models/table.model';
import { RouterLink } from '@angular/router';
import { User } from '../../models/user.model';

import { InputPadComponent } from '../../components/input-pad/input-pad.component';
import { WinnerComponent } from '../../components/winner/winner.component';
import { RoundRow, UserColumn, CountRoundRow } from '../../models/sheet';


@Component({
    selector: 'app-sheet',
    imports: [RouterLink, InputPadComponent, WinnerComponent],
    templateUrl: './sheet.component.html',
    styleUrl: './sheet.component.css'
})
export class SheetComponent {

  @Output() checkEndingGame = new EventEmitter<{ round: RoundRow[], users: UserColumn[] }>();
  @Output() triggerOpenWinner = new EventEmitter<{ round: RoundRow[], users: UserColumn[] }>();
  @Output() triggerSaveRound = new EventEmitter<RoundRow[]>();
  @Input() isEndingGame: boolean = false;

  table: Table | undefined;
  users: UserColumn[] = [];

  @ViewChild(InputPadComponent) inputPadComponent: InputPadComponent | undefined;
  selectedRow: number = 0;
  selectedPositionUser: number = 0;


  loadComponent(table : Table){
    this.table = table;
    this.generateUsers(table.users);
    if(table.round.length == 0){
      this.addRound();
    }
    this.checkEndingGame.emit({ round: this.table!.round, users: this.users });
  }

  generateUsers(usersToAdd: User[]) {
    var i = 1;
    usersToAdd.forEach((user) => {
      const column: UserColumn = {
        "position": i,
        "user": user,
      }
      this.users.push(column);
      i += 1;
    });
    this.users.sort((a, b) => a.position - b.position);
  }

  trackByUserPosition(index: number, user: UserColumn): number {
    return user.position;
  }

  getSum(user: UserColumn): number {
    let totalValue = 0;
    this.table!.round.forEach(roundRow => {
      roundRow.points.forEach(countRoundRow => {
        if (countRoundRow.user.position === user.position) {
          totalValue += countRoundRow.value;
        }
      });
    });
    return totalValue;
  }

  addRound() {
    const row: RoundRow = {
      "row": this.table!.round.length + 1,
      "points": [],
    }
    this.users.forEach((userRow) => {
      const count: CountRoundRow = {
        user: userRow,
        value: 0
      }
      row.points.push(count);
    })
    this.table!.round.push(row);
    this.table!.round.sort((a, b) => a.row - b.row);
    if(this.table!.round && this.users){
      this.checkEndingGame.emit({ round: this.table!.round, users: this.users });
      this.triggerSaveRound.emit(this.table!.round);
    }
  }

  openWinner(){
    this.triggerOpenWinner.emit({ round: this.table!.round, users: this.users });
  }

  openInputPad(row: number, point: CountRoundRow) {
    this.selectedRow = row;
    this.selectedPositionUser = point.user.position;
    if (this.inputPadComponent) {
      this.inputPadComponent.openInput(point.value);
    }
  }

  changeValue(numberValue: number) {
    const roundRow = this.table!.round.find(row => row.row === this.selectedRow);
    if (roundRow) {
      const countRoundRow = roundRow.points.find(point => point.user.position === this.selectedPositionUser);
      if (countRoundRow) {
        if(countRoundRow.value != 0) {
          countRoundRow.value = 0;
        }
        if(!this.table?.game?.scoreNegatif && this.getSum(countRoundRow.user)+numberValue < 0){
          countRoundRow.value = this.getSum(countRoundRow.user) *-1;
        } else {
          countRoundRow.value = numberValue;
        }
      }
    }
    if(this.table!.round && this.users){
      this.checkEndingGame.emit({ round: this.table!.round, users: this.users });
      this.triggerSaveRound.emit(this.table!.round);
    }
  }


}
