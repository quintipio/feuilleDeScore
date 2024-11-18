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

  private tableService = inject(TableService);

  cartes!: { [key: string]: CarteChateauCombo };
  table: Table | undefined;
  joueurs: ChateauComboJoueur[] = [];
  joueurEnCours: ChateauComboJoueur | undefined;

  listeCartes: string[] = [];

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

  autoCompleteEvent(newCard: string, nameElement: string) {
    const carte = this.cartes[newCard];
    switch (nameElement) {
      case "0_0":
        this.joueurEnCours!.plateau[0][0].carte = carte;
        break;
      case "0_1":
        this.joueurEnCours!.plateau[0][1].carte = carte;
        break;
      case "0_2":
        this.joueurEnCours!.plateau[0][2].carte = carte;
        break;
      case "1_0":
        this.joueurEnCours!.plateau[1][0].carte = carte;
        break;
      case "1_1":
        this.joueurEnCours!.plateau[1][1].carte = carte;
        break;
      case "1_2":
        this.joueurEnCours!.plateau[1][2].carte = carte;
        break;
      case "2_0":
        this.joueurEnCours!.plateau[2][0].carte = carte;
        break;
      case "2_1":
        this.joueurEnCours!.plateau[2][1].carte = carte;
        break;
      case "2_2":
        this.joueurEnCours!.plateau[2][2].carte = carte;
        break;
    }
  }

  maxValue(element: string[] | undefined): number | undefined {
    if (element && element.length > 0) {
      return Number(element[0]);
    }
    return undefined;
  }

  ouvrirPlateau(plateau: ChateauComboJoueur) {
    this.joueurEnCours = plateau;
  }

  genererNewPlateau(user: User): ChateauComboJoueur {
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

}
