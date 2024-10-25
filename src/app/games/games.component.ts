import { Component, inject } from '@angular/core';
import { UserService } from '../service/users.service';
import { User } from '../models/user.model';
import { InputScoreComponent } from '../components/input-score/input-score.component'
import { GameService } from '../service/games.service';
import { Game } from '../models/game.model';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [InputScoreComponent, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {
  private gameService = inject(GameService);

  isCreateTable: boolean = false;
  selectedUsers: User[] = [];
  selectedGame: number = 0;
  games: Game[] = [];
  editGameConditionWinScoreEleve: boolean = true;
  labelModal = "";
  isModif = false;
  gameForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.max(50)]),
    mancheLimite: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]),
    pointLimite: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')])
  });



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
    this.labelModal = "Nouveau jeu";
    this.gameForm.patchValue({ name: "", mancheLimite: "0", pointLimite: "0" });
    this.isModif = false;
  }

  openEditGameModal(): void {
    this.labelModal = "Modifier le jeu";
    this.isModif = true;
    const gameSelected = this.games.find(game => game.id == this.selectedGame);
    if (gameSelected != undefined) {
      this.editGameConditionWinScoreEleve = gameSelected.scorePlusEleve;
      this.gameForm.patchValue({ name: gameSelected.name, mancheLimite: gameSelected.mancheLimite.toString(), pointLimite: gameSelected.scoreLimite.toString() });
    }
  }

  validateFormGame(): void {
    if(this.isModif){
      const gameSelected = this.games.find(game => game.id == this.selectedGame);
      if(gameSelected){
        if(this.gameForm.value.name) {
          gameSelected.name = this.gameForm.value.name;
        }

        if(this.gameForm.value.pointLimite) {
          gameSelected.scoreLimite = Number.parseInt(this.gameForm.value.pointLimite);
        }

        if(this.gameForm.value.mancheLimite) {
          gameSelected.mancheLimite = Number.parseInt(this.gameForm.value.mancheLimite);
        }

        gameSelected.scorePlusEleve = this.editGameConditionWinScoreEleve;

        this.gameService.updateGame(gameSelected);
      }
    } else {
      const newGame = {name: "", scorePlusEleve: this.editGameConditionWinScoreEleve, scoreLimite: 0, mancheLimite: 0};

      if(this.gameForm.value.name) {
        newGame.name = this.gameForm.value.name;
      }

      if(this.gameForm.value.pointLimite) {
        newGame.scoreLimite = Number.parseInt(this.gameForm.value.pointLimite);
      }

      if(this.gameForm.value.mancheLimite) {
        newGame.mancheLimite = Number.parseInt(this.gameForm.value.mancheLimite);
      }

      this.gameService.addGame(newGame)

    }
  }

  changeConditionWin(scoreEleve: boolean) {
    this.editGameConditionWinScoreEleve = scoreEleve;
  }

}
