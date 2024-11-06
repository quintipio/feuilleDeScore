import { Component, inject, ViewChild } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { TableService } from '../service/table.service';
import { Table } from '../models/table.model';
import { Game } from '../models/game.model';
import { ConfigGameComponent } from '../games/config-game/config-game.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink, ConfigGameComponent, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @ViewChild(ConfigGameComponent) configGameComponent: ConfigGameComponent | undefined;
  private tableService = inject(TableService);

  tables:Table[] = [];
  private lastTableSelected = 0;

  constructor(private router: Router) { }

  ngOnInit(){
    this.loadTables();
  }

  loadTables() {
    this.tableService.getAllTables().subscribe({
      next: (tables: Table[]) => {
        this.tables = tables
      },
    });
  }

  startSheet(sheet: string | undefined, idTable: number) {
    if(sheet){
      var path = "sheet/"+sheet;
      this.router.navigate([path], { queryParams: { idTable: idTable } });
    }
  }

  startNewSheet(sheet: string | undefined, idTable: number) {
    if(sheet){
      this.tableService.updateRound(idTable, []).subscribe({
        next: () => {
          var path = "sheet/"+sheet;
        this.router.navigate([path], { queryParams: { idTable: idTable } });
        },
      });

    }
  }

  deleteTable(id :number){
    this.tableService.deleteTable(id).subscribe({
      next: () => {
        this.loadTables();
      },
    });
  }

  isGameInProgress(table : Table){
    return table.round.length > 0;
  }

  openGameModal(game :Game | undefined, id: number){
    if(game && this.configGameComponent) {
      this.lastTableSelected = id;
      this.configGameComponent.initializeGame(game);
    }
  }

  onGameValidated(game: Game){
    if(this.lastTableSelected != 0){
      const table = this.tables.find(table => table.id === this.lastTableSelected);
      if(table){
        table.game = game;
        this.tableService.updateTable(table).subscribe({
          next: () => {
            this.loadTables();
          },
        });
      }
    }
  }
}
