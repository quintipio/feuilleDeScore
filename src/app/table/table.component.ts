import { Component, inject, ViewChild } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { TableService } from '../service/table.service';
import { Table } from '../models/table.model';
import { Game } from '../models/game.model';
import { ConfigGameComponent } from '../games/config-game/config-game.component';

import { environment } from './../../environments/environment'

@Component({
    selector: 'app-table',
    imports: [RouterLink, ConfigGameComponent],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class TableComponent {
  environment = environment;
  @ViewChild(ConfigGameComponent) configGameComponent: ConfigGameComponent | undefined;
  private tableService = inject(TableService);

  tables:Table[] = [];
  private lastTableSelected = 0;
  private selectedTableToDelete: number = -1;

  constructor(private router: Router) { }

  ngOnInit(){
    this.loadTables();
  }

  loadTables() {
    this.tableService.getAllTables().subscribe({
      next: (tables: Table[]) => {
        this.tables = tables.sort((a, b) => {
          if (a.game?.name && b.game?.name) {
            return a.game.name.localeCompare(b.game.name);
          }
          return 0;
        });
      },
      error: (err) => console.error('Erreur lors du chargement des tables :', err)
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
      this.tableService.getTable(idTable);
      this.tableService.updateRound(idTable, []).subscribe({
        next: () => {
          this.tableService.updateSpecificData(idTable, "").subscribe({
            next: () => {
              var path = "sheet/"+sheet;
              this.router.navigate([path], { queryParams: { idTable: idTable } });
            },
            error: (err) => console.error('Erreur lors de la réinitialisation de la table:', err)
          });
        },
        error: (err) => console.error('Erreur lors de la réinitialisation de la table:', err)
      });
    }
  }

  openHistoric(idTable: number) {
    this.router.navigate(['tables/historic'], { queryParams: { idTable: idTable } });
  }

  prepareDeleteTable(id :number){
    this.selectedTableToDelete = id;
  }

  deleteTable(){
    this.tableService.deleteTable(this.selectedTableToDelete).subscribe({
      next: () => {
        this.loadTables();
        this.selectedTableToDelete = -1;
      },
      error: (err) => console.error('Erreur lors de la suppression de la table :', err)
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
        table.round = [];
        table.specificData = "";
        this.tableService.updateTable(table).subscribe({
          next: () => {
            this.loadTables();
          },
          error: (err) => console.error('Erreur lors de l\'update de la table :', err)
        });
      }
    }
  }
}
