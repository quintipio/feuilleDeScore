import { Component, inject, ViewChild } from '@angular/core';
import { User } from '../models/user.model';
import { GameService } from '../service/games.service';
import { Game } from '../models/game.model';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ConfigGameComponent } from './config-game/config-game.component';
import { TableService } from '../service/table.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfigGameComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {
  private gameService = inject(GameService);
  private tableService = inject(TableService);

  isCreateTable: boolean = false;
  selectedUsers: User[] = [];
  selectedGame: number = 0;
  games: Game[] = [];


  @ViewChild(ConfigGameComponent) configGameComponent: ConfigGameComponent | undefined;
  isModifConfig = false;
  labelModalConfig = "";


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isCreateTable = params['isCreateTable'] === 'true';
      this.selectedUsers = params['selectedUsers'] ? JSON.parse(params['selectedUsers']) : [];
    });
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.games$.subscribe((data: Game[]) => {
      this.games = data;
    });
  }

  deleteGame(): void {
    this.gameService.deleteGame(this.selectedGame);
    this.selectedGame = 0;
  }

  selectGame(selectedGame: number): void {
    if (selectedGame == this.selectedGame) {
      this.selectedGame = 0;
    } else {
      this.selectedGame = selectedGame;
    }
  }

  isSelectGame(id: number): boolean {
    return this.selectedGame === id;
  }

  isSelectedAndEditableGame() {
    if(this.selectedGame != 0) {
      const gameSelectedConfig = this.games.find(game => game.id == this.selectedGame);
      return gameSelectedConfig?.canEdit;
    } else {
      return false;
    }
  }

  isReadyToCreateTable() {
    return this.selectedGame != 0 && this.selectedUsers.length > 0 && this.isCreateTable;
  }

  openNewGameModal(): void {
    this.labelModalConfig = "Nouveau jeu";
    this.isModifConfig = false;
    if(this.configGameComponent){
      this.configGameComponent.initializeGame(undefined);
    }
  }

  openEditGameModal(): void {
    this.labelModalConfig = "Modifier le jeu";
    this.isModifConfig = true;
    const gameSelectedConfig = this.games.find(game => game.id == this.selectedGame);
    if(this.configGameComponent && gameSelectedConfig){
      this.configGameComponent.initializeGame(gameSelectedConfig);
    }
  }

  onGameValidated(game: Game) {
    if(game.id === 0){
      this.gameService.addGame(game);
    } else {
      this.gameService.updateGame(game);
    }
  }

  createTable(){
      const newTable = this.tableService.generateEmptyTable();
      newTable.users = this.selectedUsers;
      newTable.game = this.games.find(game => game.id == this.selectedGame);
      this.tableService.addTable(newTable);
      this.router.navigate(['/tables']);
  }
}
