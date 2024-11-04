import { Component, inject, ViewChild } from '@angular/core';
import { User } from '../models/user.model';
import { GameService } from '../service/games.service';
import { Game } from '../models/game.model';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ConfigGameComponent } from './config-game/config-game.component';
import { TableService } from '../service/table.service';
import { UserService } from '../service/users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfigGameComponent, FormsModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {
  private gameService = inject(GameService);
  private tableService = inject(TableService);
  private userService = inject(UserService);

  allUsers: User[] = [];
  selectedUsers: User[] = [];
  newUser: string = '';

  selectedGame: number = 0;
  games: Game[] = [];


  @ViewChild(ConfigGameComponent) configGameComponent: ConfigGameComponent | undefined;
  isModifConfig = false;
  labelModalConfig = "";


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedUsers = params['selectedUsers'] ? JSON.parse(params['selectedUsers']) : [];
    });
    this.loadGames();
    this.loadAllUsers();
  }

  loadGames(): void {
    this.gameService.games$.subscribe((data: Game[]) => {
      this.games = data;
    });
  }

  loadAllUsers(): void {
    this.userService.users$.subscribe((data: User[]) => {
      this.allUsers = data;
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
    return this.selectedGame != 0 && this.selectedUsers.length > 0;
  }

  removeUser(id : number) {
    this.selectedUsers = this.selectedUsers.filter(user => user.id !== id);
  }


  /*Gestion des utilisateurs */
  addUser() {
    if (this.newUser.trim() && this.newUser.length <= 50) {
      const newUser: User = { id: Date.now(), name: this.newUser };
      this.userService.addUser(newUser);
      this.newUser = '';
    }
  }

  deleteUser(user: User) {
    this.allUsers = this.allUsers.filter(u => u.id !== user.id);
    this.selectedUsers = this.selectedUsers.filter(u => u.id !== user.id);
    this.userService.deleteUser(user.id);
  }

  selectUser(user: User) {
    if (!this.selectedUsers.find(u => u.id === user.id)) {
      this.selectedUsers.push(user);
    }
  }
  /*Gestion de la table */


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
