import { Component, inject, ViewChild } from '@angular/core';
import { User } from '../models/user.model';
import { InputScoreComponent } from '../components/input-score/input-score.component'
import { GameService } from '../service/games.service';
import { Game } from '../models/game.model';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ConfigGameComponent } from './config-game/config-game.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [InputScoreComponent, CommonModule, RouterLink, ConfigGameComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {
  private gameService = inject(GameService);

  isCreateTable: boolean = false;
  selectedUsers: User[] = [];
  selectedGame: number = 0;
  games: Game[] = [];


  @ViewChild(ConfigGameComponent) configGameComponent: ConfigGameComponent | undefined;
  isModifConfig = false;
  labelModalConfig = "";


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isCreateTable = params['isCreateTable'] === 'true';
      this.selectedUsers = params['selectedUsers'] ? JSON.parse(params['selectedUsers']) : [];
      console.log(this.selectedUsers);
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

  isSelectedGame() {
    return this.selectedGame != 0;
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
}
