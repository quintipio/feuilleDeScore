import { Component, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CarteChateauCombo, CarteService } from './cartes.service';
import { WinnerComponent } from '../../components/winner/winner.component';
import { InputScoreComponent } from '../../components/input-score/input-score.component';
import { TableService } from '../../service/table.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from '../../models/table.model';
import { User } from '../../models/user.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  imports: [InputScoreComponent, WinnerComponent, MatAutocompleteModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
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
  typeaheadA: FormControl = new FormControl();
  typeaheadB: FormControl = new FormControl();
  typeaheadC: FormControl = new FormControl();
  typeaheadD: FormControl = new FormControl();
  typeaheadE: FormControl = new FormControl();
  typeaheadF: FormControl = new FormControl();
  typeaheadG: FormControl = new FormControl();
  typeaheadH: FormControl = new FormControl();
  typeaheadI: FormControl = new FormControl();
  suggestionsA: string[] = [];
  suggestionsB: string[] = [];
  suggestionsC: string[] = [];
  suggestionsD: string[] = [];
  suggestionsE: string[] = [];
  suggestionsF: string[] = [];
  suggestionsG: string[] = [];
  suggestionsH: string[] = [];
  suggestionsI: string[] = [];

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

  suggest(liste: string) {

    switch (liste) {
      case "A":
        var saisie = this.typeaheadA.value as string;
        saisie = this.removeAccents(saisie.toLowerCase());
        this.suggestionsA = this.listeCartes
          .filter(c => this.removeAccents(c.toLowerCase()).startsWith(saisie))
          .slice(0, 3);
        break;
      case "B":
        var saisie = this.typeaheadB.value as string;
        saisie = this.removeAccents(saisie.toLowerCase());
        this.suggestionsB = this.listeCartes
          .filter(c => this.removeAccents(c.toLowerCase()).startsWith(saisie))
          .slice(0, 3);
        break;
      case "C":
        var saisie = this.typeaheadC.value as string;
        saisie = this.removeAccents(saisie.toLowerCase());
        this.suggestionsC = this.listeCartes
          .filter(c => this.removeAccents(c.toLowerCase()).startsWith(saisie))
          .slice(0, 3);
        break;
      case "D":
        var saisie = this.typeaheadD.value as string;
        saisie = this.removeAccents(saisie.toLowerCase());
        this.suggestionsD = this.listeCartes
          .filter(c => this.removeAccents(c.toLowerCase()).startsWith(saisie))
          .slice(0, 3);
        break;
      case "E":
        var saisie = this.typeaheadE.value as string;
        saisie = this.removeAccents(saisie.toLowerCase());
        this.suggestionsE = this.listeCartes
          .filter(c => this.removeAccents(c.toLowerCase()).startsWith(saisie))
          .slice(0, 3);
        break;
      case "F":
        var saisie = this.typeaheadF.value as string;
        saisie = this.removeAccents(saisie.toLowerCase());
        this.suggestionsF = this.listeCartes
          .filter(c => this.removeAccents(c.toLowerCase()).startsWith(saisie))
          .slice(0, 3);
        break;
      case "G":
        var saisie = this.typeaheadG.value as string;
        saisie = this.removeAccents(saisie.toLowerCase());
        this.suggestionsG = this.listeCartes
          .filter(c => this.removeAccents(c.toLowerCase()).startsWith(saisie))
          .slice(0, 3);
        break;
      case "H":
        var saisie = this.typeaheadH.value as string;
        saisie = this.removeAccents(saisie.toLowerCase());
        this.suggestionsH = this.listeCartes
          .filter(c => this.removeAccents(c.toLowerCase()).startsWith(saisie))
          .slice(0, 3);
        break;
      case "I":
        var saisie = this.typeaheadI.value as string;
        saisie = this.removeAccents(saisie.toLowerCase());
        this.suggestionsI = this.listeCartes
          .filter(c => this.removeAccents(c.toLowerCase()).startsWith(saisie))
          .slice(0, 3);
        break;
    }
  }

  removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  getNomCarte(nom: string, liste: string) {
    switch (liste) {
      case "A":
        this.typeaheadA.setValue(nom);
        this.suggestionsA = [];
        break;
      case "B":
        this.typeaheadB.setValue(nom);
        this.suggestionsB = [];
        break;
      case "C":
        this.typeaheadC.setValue(nom);
        this.suggestionsC = [];
        break;
      case "D":
        this.typeaheadD.setValue(nom);
        this.suggestionsD = [];
        break;
      case "E":
        this.typeaheadE.setValue(nom);
        this.suggestionsE = [];
        break;
      case "F":
        this.typeaheadF.setValue(nom);
        this.suggestionsF = [];
        break;
      case "G":
        this.typeaheadG.setValue(nom);
        this.suggestionsG = [];
        break;
      case "H":
        this.typeaheadH.setValue(nom);
        this.suggestionsH = [];
        break;
      case "I":
        this.typeaheadI.setValue(nom);
        this.suggestionsI = [];
        break;
    }
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
