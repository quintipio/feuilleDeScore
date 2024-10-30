import { Component, inject, ViewChild } from '@angular/core';
import { Table } from '../../models/table.model';
import { TableService } from '../../service/table.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/users.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { InputPadComponent } from '../../components/input-pad/input-pad.component';

type UserColumn = {
  position: number;
  user: User;
}

type CountRoundRow = {
  user:UserColumn
  value: number;
}

type RoundRow = {
  row: number;
  points: CountRoundRow[];
}

@Component({
  selector: 'app-generic-sheet',
  standalone: true,
  imports: [RouterLink, CommonModule, InputPadComponent],
  templateUrl: './generic-sheet.component.html',
  styleUrl: './generic-sheet.component.css'
})
export class GenericSheetComponent {

  private tableService = inject(TableService);
  private userService = inject(UserService);

  table: Table | undefined;
  round: RoundRow[] = [];
  users: UserColumn[] = [];

  @ViewChild(InputPadComponent) inputPadComponent: InputPadComponent | undefined;
  selectedRow: number = 0;
  selectedPositionUser: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const idTable = +params['idTable'];
      if (idTable) {
        this.tableService.getTable(idTable).subscribe(table => {
          this.table = table;
          if (this.table) {
            this.userService.getUsersById(this.table.usersId).subscribe((users: User[]) => {
              if (this.table) {
                this.table.users = users;
                this.generateUsers(this.table.users);
                this.addRound();
              }
            });
          }
        });
      }
    });
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
      "row" : this.round.length + 1,
      "points" :[],
    }
    this.users.forEach((userRow) => {
      const count: CountRoundRow=  {
        user : userRow,
        value: 0
      }
      row.points.push(count);
    })
    this.round.push(row);
    this.round.sort((a, b) => a.row - b.row);
  }

  openInputPad(row: number, point:CountRoundRow){
      this.selectedRow = row;
      this.selectedPositionUser = point.user.position;
      if(this.inputPadComponent){
        this.inputPadComponent.openInput(point.value);
      }
  }

  changeValue(numberValue: number) {
    const roundRow = this.round.find(row => row.row === this.selectedRow);
    if (roundRow) {
        const countRoundRow = roundRow.points.find(point => point.user.position === this.selectedPositionUser);
        if (countRoundRow) {
            countRoundRow.value = numberValue;
        }
    }
}
}
