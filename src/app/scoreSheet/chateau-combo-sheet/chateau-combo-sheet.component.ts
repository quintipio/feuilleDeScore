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
import { map, Observable, startWith, of } from 'rxjs';
import { CommonModule } from '@angular/common';

type CartePlateau = {
  carte: CarteChateauCombo | undefined,
  nbPieces: number,
  nomCarte:string,
  score:number
}

type ChateauComboJoueur = {
  user: User,
  scoreTotal: number,
  cle: number,
  plateau:CartePlateau[][]
}

@Component({
  selector: 'app-chateau-combo-sheet',
  standalone: true,
  imports: [InputScoreComponent, WinnerComponent, MatAutocompleteModule, MatFormFieldModule, MatInputModule,ReactiveFormsModule, CommonModule],
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

  constructor(private carteService: CarteService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.cartes = this.carteService.loadCartes();
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

  ouvrirPlateau(plateau: ChateauComboJoueur) {
    this.joueurEnCours = plateau;
  }

  genererNewPlateau(user: User) : ChateauComboJoueur{
    const plateauCarte : CartePlateau[][] = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => ({
        carte: undefined,
        nbPieces: 0,
        nomCarte: '',
        score: 0
      }))
    );
    const newPlateau : ChateauComboJoueur = {
      cle : 0,
      scoreTotal : 0,
      user : user,
      plateau : plateauCarte
    }
    return newPlateau;

  }

}
