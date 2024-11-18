import { Component, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CarteChateauCombo, CarteService } from './cartes.service';
import { WinnerComponent } from '../../components/winner/winner.component';
import { InputScoreComponent } from '../../components/input-score/input-score.component';
import { TableService } from '../../service/table.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from '../../models/table.model';
import { User } from '../../models/user.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';
import { CountRoundRow, RoundRow } from '../../models/sheet';

type CartePlateau = {
  carte: CarteChateauCombo | undefined,
  nbPieces: number,
  nomCarte: string,
  score: number
}

type ChateauComboJoueur = {
  user: User,
  scoreTotal: number,
  cle: number,
  plateau: CartePlateau[][]
}

@Component({
  selector: 'app-chateau-combo-sheet',
  standalone: true,
  imports: [InputScoreComponent, WinnerComponent, AutocompleteComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './chateau-combo-sheet.component.html',
  styleUrl: './chateau-combo-sheet.component.css'
})
export class ChateauComboSheetComponent {
  @ViewChild(WinnerComponent) winnerComponent: WinnerComponent | undefined;
  @ViewChildren(InputScoreComponent) inputScores: QueryList<InputScoreComponent> | undefined;
  @ViewChildren(AutocompleteComponent) autoCompletes: QueryList<AutocompleteComponent> | undefined;

  private tableService = inject(TableService);
  listeCartes: string[] = [];

  cartes!: { [key: string]: CarteChateauCombo };
  table: Table | undefined;
  joueurs: ChateauComboJoueur[] = [];
  joueurEnCours: ChateauComboJoueur | undefined;


  constructor(private carteService: CarteService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.cartes = this.carteService.loadCartes();
    this.listeCartes = Object.keys(this.cartes);
    this.route.queryParams.subscribe(params => {
      const idTable = +params['idTable'];
      if (idTable) {
        this.tableService.getTable(idTable).subscribe({
          next: (table: Table | undefined) => {
            if (table) {
              this.table = table;
              if (this.table?.specificData !== undefined && this.table.specificData !== "") {
                console.log("Partie en cours");
                this.joueurs = JSON.parse(this.table.specificData);
                this.ouvrirPlateau(this.joueurs[0]);
              } else {
                console.log("Nouvelle partie");
                this.table.users.forEach((user) => {
                  const plateauUser = this.genererNewPlateau(user);
                  this.joueurs.push(plateauUser);
                });
                this.ouvrirPlateau(this.joueurs[0]);
              }
            }
          },
          error: (error) => {
            console.error("Error fetching table:", error);
          }
        });
      }
    });
  }



  private calculerScoreTotalJoueur() {
    let somme = 0;
    for (let i = 0; i < this.joueurEnCours!.plateau.length; i++) {
      for (let j = 0; j < this.joueurEnCours!.plateau[i].length; j++) {
        somme += this.joueurEnCours!.plateau[i][j].score;
      }
    }
    this.joueurEnCours!.scoreTotal = somme;
  }

  private updateJoueurEnCoursAndSave() {
    const index = this.joueurs.findIndex(joueur => joueur.user.id === this.joueurEnCours?.user.id);
    if (index !== -1) {
      this.joueurs[index] = { ...this.joueurEnCours! };
    }

    const roundRow: CountRoundRow[] = [];
    this.joueurs.forEach(joueur => {
      const player :CountRoundRow = {
        user : {
          position : 0,
          user : joueur.user
        },
        value : joueur.scoreTotal
      }
      roundRow.push(player);
    });

    const round : RoundRow[] = [{
      points : roundRow,
      row : 1
    }]

    this.table!.specificData = JSON.stringify(this.joueurs);
    this.table!.round = round;
    this.tableService.updateTable(this.table!).subscribe({
      next: () => {
      },
      error: (error) => {
        console.error("Error update table:", error);
      }
    });
  }

  private ouvrirPlateau(plateau: ChateauComboJoueur) {
    this.joueurEnCours = plateau;
    const inputCle = this.inputScores?.find(input => input.name === "inputCles");
    inputCle?.reinit(this.joueurEnCours.cle);
    for (let i = 0; i < this.joueurEnCours!.plateau.length; i++) {
      for (let j = 0; j < this.joueurEnCours!.plateau[i].length; j++) {
        const input = this.inputScores?.find(input => input.name === "piece_"+i+"_"+j);
        input?.reinit(this.joueurEnCours!.plateau[i][j].nbPieces);
        const autocomplete = this.autoCompletes?.find(autocomplete => autocomplete.name === "autocomplete_"+i+"_"+j);
        autocomplete?.reinit(this.joueurEnCours!.plateau[i][j].nomCarte);
      }
    }
  }

  private genererNewPlateau(user: User): ChateauComboJoueur {
    const plateauCarte: CartePlateau[][] = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => ({
        carte: undefined,
        nbPieces: 0,
        nomCarte: '',
        score: 0
      }))
    );
    const newPlateau: ChateauComboJoueur = {
      cle: 0,
      scoreTotal: 0,
      user: user,
      plateau: plateauCarte
    }
    return newPlateau;

  }

  autoCompleteEvent(newCard: string, nameElement: string) {
    const carte = this.cartes[newCard];
    let [i, j] = nameElement.split("_").map(Number);
    this.joueurEnCours!.plateau[i][j].carte = carte;
    this.joueurEnCours!.plateau[i][j].nomCarte = newCard;
    this.joueurEnCours!.plateau[i][j].score += 1;
    this.joueurEnCours!.plateau[i][j].nbPieces = 0;
    const input = this.inputScores?.find(input => input.name === "piece_"+i+"_"+j);
    input?.reinit(this.joueurEnCours!.plateau[i][j].nbPieces);
  }

  changePieceEvent(numberPiece : number,nameElement:string){
    let [i, j] = nameElement.split("_").map(Number);
    this.joueurEnCours!.plateau[i][j].nbPieces = numberPiece;
  }

  changeCleEvent(nbCles :number){
    this.joueurEnCours!.cle = nbCles;
  }

  maxValue(element: string[] | undefined): number | undefined {
    if (element && element.length > 0) {
      return Number(element[0]);
    }
    return undefined;
  }

  ouvrirJoueurSuivant(){
    const joueur = this.joueurs.find(joueur => joueur.scoreTotal === 0);
    if(!joueur){
      this.ouvrirJoueur(this.joueurs[0].user.id);
    }
    this.ouvrirJoueur(joueur?.user.id)
  }

  isJoueurWithZero() : boolean{
    return this.joueurs.some(joueur => joueur.scoreTotal === 0);
  }

  ouvrirJoueur(idJoueur: number | undefined) {
    this.calculerScoreTotalJoueur();
    this.updateJoueurEnCoursAndSave();
    const newJoueur = this.joueurs.find(joueur => joueur.user.id === idJoueur);
    if (newJoueur) {
      this.ouvrirPlateau(newJoueur);
    }
  }

  openWinner() {
    this.updateJoueurEnCoursAndSave();
    const winners: CountRoundRow[] = this.table!.round[0].points;

    winners.sort((a, b) => b.value - a.value);
    winners.forEach((winner, index) => {
      winner.user.position = index + 1;
    });
    this.winnerComponent?.loadWinners(winners);
  }

  closeGame() {
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
