import { Component, inject, ViewChild } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { TableService } from '../service/table.service';
import { Table } from '../models/table.model';
import { UserService } from '../service/users.service';
import { User } from '../models/user.model';
import { Game } from '../models/game.model';
import { ConfigGameComponent } from '../games/config-game/config-game.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink, ConfigGameComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @ViewChild(ConfigGameComponent) configGameComponent: ConfigGameComponent | undefined;
  private tableService = inject(TableService);
  private userService = inject(UserService);

  tables:Table[] = [];
  private lastTableSelected = 0;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
    this.loadTables();
  }

  loadTables() {
    this.tableService.tables$.subscribe((data: Table[]) => {
      this.tables = data;
    });
  }

  startSheet(sheet: string | undefined, idTable: number) {
    if(sheet){
      var path = "sheet/"+sheet;
      this.router.navigate([path], { queryParams: { idTable: idTable } });
    }
  }

  deleteTable(id :number){
    this.tableService.deleteTable(id);
    this.loadTables();
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
        this.tableService.updateTable(table);
      }
    }
  }
}
