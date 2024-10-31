import { Component, inject, ViewChild } from '@angular/core';
import { Table } from '../../models/table.model';
import { TableService } from '../../service/table.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { InputPadComponent } from '../../components/input-pad/input-pad.component';
import { WinnerComponent } from '../../components/winner/winner.component';

type UserColumn = {
  position: number;
  user: User;
}

type CountRoundRow = {
  user: UserColumn
  value: number;
}

type RoundRow = {
  row: number;
  points: CountRoundRow[];
}

@Component({
  selector: 'app-generic-sheet',
  standalone: true,
  imports: [RouterLink, CommonModule, InputPadComponent, WinnerComponent],
  templateUrl: './generic-sheet.component.html',
  styleUrl: './generic-sheet.component.css'
})
export class GenericSheetComponent {

  private tableService = inject(TableService);
  table: Table | undefined;
  round: RoundRow[] = [];
  users: UserColumn[] = [];
  isEndingGame: boolean = false;
  endingNextTurn: boolean = false;

  @ViewChild(InputPadComponent) inputPadComponent: InputPadComponent | undefined;
  selectedRow: number = 0;
  selectedPositionUser: number = 0;
  @ViewChild(WinnerComponent) winnerComponent: WinnerComponent | undefined;


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const idTable = +params['idTable'];
      if (idTable) {
        this.tableService.getTable(idTable).subscribe(table => {
          this.table = table;
          if (this.table) {
            this.generateUsers(this.table.users);
            this.addRound();
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

  checkEndingGame() {
    const maxRowValue = Math.max(...this.round.map(r => r.row));
    if (this.table?.game?.mancheLimite && this.table?.game?.mancheLimite > 0 && maxRowValue >= this.table.game.mancheLimite) {
      this.isEndingGame = true;
      return;
    }

    if(this.table?.game?.scoreLimite && this.table?.game?.scoreLimite > 0){
      for (const user of this.users) {
        var score = this.getSum(user);
        if(score >= this.table?.game?.scoreLimite){
          if(this.table.game.lastTurnStopAfter && !this.endingNextTurn){
            this.endingNextTurn = true;
          } else {
            this.isEndingGame = true;
          }
          return;
        } else {
          this.isEndingGame = false;
        }
      }
    }
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
    this.checkEndingGame();
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
    this.checkEndingGame();
  }

  openWinner(){
    const winners:CountRoundRow[] = [];

    for (const user of this.users) {
      const winner:CountRoundRow = {
        user: user,
        value: this.getSum(user)
      }
      winners.push(winner)
    }

    if(this.table?.game?.scorePlusEleve){
      winners.sort((a, b) => b.value - a.value);
    } else {
      winners.sort((a, b) => a.value - b.value);
    }
    winners.forEach((winner, index) => {
      winner.user.position = index + 1;
    });
    this.winnerComponent?.loadWinners(winners);
  }

  closeGame(){
    this.router.navigate(["/tables"]);
  }
}
