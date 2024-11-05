import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { Table } from '../../models/table.model';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { InputPadComponent } from '../../components/input-pad/input-pad.component';
import { WinnerComponent } from '../../components/winner/winner.component';
import { RoundRow, UserColumn, CountRoundRow } from '../../models/sheet';


@Component({
  selector: 'app-sheet',
  standalone: true,
  imports: [RouterLink, CommonModule, InputPadComponent, WinnerComponent],
  templateUrl: './sheet.component.html',
  styleUrl: './sheet.component.css'
})
export class SheetComponent {

  @Output() checkEndingGame = new EventEmitter<{ round: RoundRow[], users: UserColumn[] }>();
  @Output() triggerOpenWinner = new EventEmitter<{ round: RoundRow[], users: UserColumn[] }>();
  @Input() isEndingGame: boolean = false;

  table: Table | undefined;
  users: UserColumn[] = [];
  round: RoundRow[] = [];

  @ViewChild(InputPadComponent) inputPadComponent: InputPadComponent | undefined;
  selectedRow: number = 0;
  selectedPositionUser: number = 0;


  loadComponent(table : Table){
    this.table = table;
    console.log("COUCOUUU");
    this.generateUsers(table.users);
    this.addRound();
  }

  generateUsers(usersToAdd: User[]) {
    var i = 1;
    usersToAdd.forEach((user) => {
      const column: UserColumn = {
        "position": i,
        "user": user
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
    this.round.forEach(roundRow => {
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
      "row": this.round.length + 1,
      "points": [],
    }
    this.users.forEach((userRow) => {
      const count: CountRoundRow = {
        user: userRow,
        value: 0
      }
      row.points.push(count);
    })
    this.round.push(row);
    this.round.sort((a, b) => a.row - b.row);
    if(this.round && this.users){
      this.checkEndingGame.emit({ round: this.round, users: this.users });
    }
  }

  openWinner(){
    this.triggerOpenWinner.emit({ round: this.round, users: this.users });
  }

  openInputPad(row: number, point: CountRoundRow) {
    this.selectedRow = row;
    this.selectedPositionUser = point.user.position;
    if (this.inputPadComponent) {
      this.inputPadComponent.openInput(point.value);
    }
  }

  changeValue(numberValue: number) {
    const roundRow = this.round.find(row => row.row === this.selectedRow);
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
    if(this.round && this.users){
      this.checkEndingGame.emit({ round: this.round, users: this.users });
    }
  }


}
