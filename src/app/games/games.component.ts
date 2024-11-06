import { Component, inject, ViewChild } from '@angular/core';
import { User } from '../models/user.model';
import { Game } from '../models/game.model';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ConfigGameComponent } from './config-game/config-game.component';
import { TableService } from '../service/table.service';
import { UserService } from '../service/users.service';
import { FormsModule } from '@angular/forms';
import { GameService } from '../service/games.service';

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

  selectedUsers: User[] = [];
  newUser: string = '';

  allUsers: User[] = [];
  games: Game[] = [];

  selectedGame: number = 0;
  isMinMaxJoueurOk: boolean = true;
  errorMinMaxUser: string = "";


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
    this.gameService.getAllGames().subscribe({
      next: (games: Game[]) => {this.games = games},
    });
  }

  loadAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.allUsers = users
      },
    });
  }

  deleteGame(): void {
    this.gameService.deleteGame(this.selectedGame).subscribe({
      next: () => {
        this.selectedGame = 0;
        this.loadGames()
        this.checkUserForTable();
      },
    });
  }

  selectGame(selectedGame: number): void {
    if (selectedGame == this.selectedGame) {
      this.selectedGame = 0;
    } else {
      this.selectedGame = selectedGame;
    }
    this.checkUserForTable();
  }

  isSelectGame(id: number): boolean {
    return this.selectedGame === id;
  }

  isSelectedAndEditableGame() {
    if(this.isMinMaxJoueurOk && this.selectedGame != 0) {
      const gameSelectedConfig = this.games.find(game => game.id == this.selectedGame);
      return gameSelectedConfig?.canEdit;
    } else {
      return false;
    }
  }

  isReadyToCreateTable() {
    return this.selectedGame != 0 && this.selectedUsers.length > 0 && this.isMinMaxJoueurOk;
  }

  removeUser(id : number) {
    this.selectedUsers = this.selectedUsers.filter(user => user.id !== id);
    this.checkUserForTable();
  }

  checkUserForTable(){
    if(this.selectedGame != 0) {
      const gameSelectedConfig = this.games.find(game => game.id == this.selectedGame);
      var numberUser = this.selectedUsers.length;
      var minJoueur =(gameSelectedConfig?.minJoueur)? gameSelectedConfig.minJoueur:0;
      var maxJoueur =(gameSelectedConfig?.maxJoueur)? gameSelectedConfig.maxJoueur:0;
      if(minJoueur != 0){
        if(numberUser < minJoueur){
          this.isMinMaxJoueurOk = false;
          this.errorMinMaxUser = "Il faut au moins "+minJoueur+" joueurs.";
          return;
        }
      }
      if(maxJoueur != 0){
        if(numberUser > maxJoueur){
          this.isMinMaxJoueurOk = false;
          this.errorMinMaxUser = "Il faut au maxmimum "+maxJoueur+" joueurs.";
          return;
        }
      }
    }
    this.isMinMaxJoueurOk = true;
    this.errorMinMaxUser = "";
  }


  /*Gestion des utilisateurs */
  addUser() {
    if (this.newUser.trim() && this.newUser.length <= 50) {
      const newUser: User = { id: Date.now(), name: this.newUser };
      this.userService.addUser(newUser).subscribe({
        next: () => {
          this.newUser = '';
          this.loadAllUsers();
        },
        error: (err) => console.error('Erreur lors de l’ajout de l’utilisateur :', err)
      });
    }
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.allUsers = this.allUsers.filter(u => u.id !== user.id);
        this.selectedUsers = this.selectedUsers.filter(u => u.id !== user.id);
        this.checkUserForTable();
        this.loadAllUsers();
      },
      error: (err) => console.error('Erreur lors de la suppression de l’utilisateur :', err)
    });
  }

  selectUser(user: User) {
    if (!this.selectedUsers.find(u => u.id === user.id)) {
      this.selectedUsers.push(user);
      this.checkUserForTable();
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
      this.gameService.addGame(game).subscribe({
        next: () => {
          this.loadGames();
        },
      });
    } else {
      this.gameService.updateGame(game).subscribe({
        next: () => {
          this.loadGames();
        },
      });
    }
  }

  createTable(){
      const newTable = this.tableService.generateEmptyTable();
      newTable.users = this.selectedUsers;
      newTable.game = this.games.find(game => game.id == this.selectedGame);
      this.tableService.addTable(newTable).subscribe({
        next: () => {
          this.router.navigate(['/tables']);
        },
      });
  }
}
