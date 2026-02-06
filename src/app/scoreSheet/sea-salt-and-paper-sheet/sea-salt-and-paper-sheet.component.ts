import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { Table } from '../../models/table.model';
import { TableService } from '../../service/table.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputPadComponent } from '../../components/input-pad/input-pad.component';
import { WinnerComponent } from '../../components/winner/winner.component';
import { SheetComponent } from '../../components/sheet/sheet.component';
import { CountRoundRow, RoundRow, UserColumn } from '../../models/sheet';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { formatDateNowToKey } from '../../Utils/Utils';

@Component({
    selector: 'app-sea-salt-and-paper-sheet',
    imports: [RouterLink, CommonModule, InputPadComponent, WinnerComponent, SheetComponent, FormsModule],
    templateUrl: './sea-salt-and-paper-sheet.component.html',
    styleUrl: './sea-salt-and-paper-sheet.component.css'
})
export class SeaSaltAndPaperSheetComponent {

  @ViewChild(WinnerComponent) winnerComponent: WinnerComponent | undefined;
  @ViewChild(SheetComponent) sheetComponent: SheetComponent | undefined;

  private tableService = inject(TableService);
  private cdr = inject(ChangeDetectorRef);

  isEndingGame: boolean = false;

  table: Table | undefined;

  selectedUser: User | null = null;
  winners: CountRoundRow[] = [];


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const idTable = +params['idTable'];
      if (idTable) {
        this.tableService.getTable(idTable).subscribe({
          next: (table: Table | undefined) => {
            if (table) {
              if (table.users.length <= 2) {
                table.game!.scoreLimite = 40;
              }
              if (table.users.length === 3) {
                table.game!.scoreLimite = 35;
              }
              if (table.users.length >= 4) {
                table.game!.scoreLimite = 30;
              }
              this.table = table;
              this.ngAfterViewInit();
            }
          },
          error: (error) => {
            console.error("Error fetching table:", error);
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    if (this.table && this.sheetComponent) {
      this.sheetComponent.loadComponent(this.table);
      this.cdr.detectChanges();
    }
  }

  onOkClick() {
    if (this.selectedUser) {
      this.isEndingGame = true;
      this.sheetComponent?.openWinner();
    }
  }


  saveRoundInDb(round: RoundRow[]) {
    this.tableService.updateRound(this.table!.id, round).subscribe({
      next: () => {
      },
      error: (err) => console.error('Erreur lors de l\'update de la table :', err)
    });
  }

  checkEndingGame(round: RoundRow[], users: UserColumn[]) {
    const maxRowValue = Math.max(...round.map(r => r.row));
    if (this.table?.game?.mancheLimite && this.table?.game?.mancheLimite > 0 && maxRowValue >= this.table.game.mancheLimite) {
      this.isEndingGame = true;
      return;
    }

    if (this.table?.game?.scoreLimite && this.table?.game?.scoreLimite > 0) {
      for (const user of users) {
        var score = this.getSum(round, user);
        if (score >= this.table?.game?.scoreLimite) {
          this.isEndingGame = true;
          return;
        } else {
          this.isEndingGame = false;
        }
      }
    }
  }


  getSum(round: RoundRow[], user: UserColumn): number {
    let totalValue = 0;
    round.forEach(roundRow => {
      roundRow.points.forEach(countRoundRow => {
        if (countRoundRow.user.position === user.position) {
          totalValue += countRoundRow.value;
        }
      });
    });
    return totalValue;
  }

  openWinner(round: RoundRow[], users: UserColumn[]) {
    const winners: CountRoundRow[] = [];

    for (const user of users) {
      const winner: CountRoundRow = {
        user: user,
        value: this.getSum(round, user)
      }
      winners.push(winner)
    }

    if (this.table?.game?.scorePlusEleve) {
      winners.sort((a, b) => b.value - a.value);
    } else {
      winners.sort((a, b) => a.value - b.value);
    }
    winners.forEach((winner, index) => {
      winner.user.position = index + 1;
    });

    if (this.selectedUser) {
      const index = winners.findIndex(winner => winner.user.user.id === this.selectedUser!.id);
      if (index !== -1) {
        const forcedWinner = winners.splice(index, 1)[0];
        winners.unshift(forcedWinner);
      }
    }

    winners.forEach((winner, index) => {
      winner.user.position = index + 1;
    });
    this.winners = winners
    this.winnerComponent?.loadWinners(winners);
  }

  closeGame() {
    this.table!.historic[formatDateNowToKey()] = this.winners;
    this.table!.specificData = "";
    this.table!.round = [];
    this.tableService.updateTable(this.table!).subscribe({
      next: () => {
        this.router.navigate(["/tables"]);
      },
      error: (error) => {
        console.error("Error update table:", error);
      }
    });
  }
}
