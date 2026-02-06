import { Component, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CarteChateauCombo, CarteService } from './cartes.service';
import { WinnerComponent } from '../../components/winner/winner.component';
import { InputScoreComponent } from '../../components/input-score/input-score.component';
import { TableService } from '../../service/table.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from '../../models/table.model';
import { User } from '../../models/user.model';
import {  ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';
import { CountRoundRow, RoundRow } from '../../models/sheet';
import { formatDateNowToKey } from '../../Utils/Utils';

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
    somme += this.joueurEnCours!.cle
    this.joueurEnCours!.scoreTotal = somme;
  }

  private calculerTableau() {
    for (let i = 0; i < this.joueurEnCours!.plateau.length; i++) {
      for (let j = 0; j < this.joueurEnCours!.plateau[i].length; j++) {
        this.calculerCarte(i, j)
      }
    }
  }

  private calculerCarte(i: number, j: number) {
    const plateau = this.joueurEnCours!.plateau;
    if (plateau[i][j].carte) {
      let nbPoints = 0;
      switch (plateau[i][j].carte?.conditionGagne) {
        case "bouclier-ligne-colonne":
          nbPoints += this.calculerBouclierLigneColonne(i, j, plateau[i][j].carte!.conditionGagneElement[0]);
          break;
        case "bouclier-ligne":
          nbPoints += this.calculerBouclierLigne(i, plateau[i][j].carte!.conditionGagneElement[0]);
          break;
        case "bouclier-colonne":
          nbPoints += this.calculerBouclierColonne(j, plateau[i][j].carte!.conditionGagneElement[0]);
          break;
        case "check-bouclier-ligne":
          nbPoints = this.calculerBouclierLigne(i, plateau[i][j].carte!.conditionGagneElement[0]) > 0 ? 1 : 0;
          break;
        case "check-bouclier-colonne":
          nbPoints = this.calculerBouclierColonne(j, plateau[i][j].carte!.conditionGagneElement[0]) > 0 ? 1 : 0;
          break;
        case "bouclier-absent":
          nbPoints = this.controleBouclierAbsent(plateau[i][j].carte!.conditionGagneElement) ? 1 : 0;
          break;
        case "cout-cartes-plus":
          nbPoints = this.compterCarteParCout(Number(plateau[i][j].carte!.conditionGagneElement[0]), true, false);
          break;
        case "cout-cartes":
          nbPoints = this.compterCarteParCout(Number(plateau[i][j].carte!.conditionGagneElement[0]), false, true);
          break;
        case "groupe-bouclier":
          nbPoints = this.calculerGroupeBouclier(plateau[i][j].carte!.conditionGagneElement);
          break;
        case "groupe-lieu":
          nbPoints = this.calculerGroupeLieu(plateau[i][j].carte!.conditionGagneElement);
          break;
        case "emplacement-horizontal":
          nbPoints = this.verfiierEmplacementHorizontal(i, plateau[i][j].carte!.conditionGagneElement[0]) ? 1 : 0;
          break;
        case "emplacement-vertical":
          nbPoints = this.verfiierEmplacementVertical(j, plateau[i][j].carte!.conditionGagneElement[0]) ? 1 : 0;
          break;
        case "emplacement-bi":
          nbPoints = this.verifierEmplacementSpeciaux(i, j, plateau[i][j].carte!.conditionGagneElement[0]) ? 1 : 0;
          break;
        case "bouclier-different-absent":
          nbPoints = this.compterBouclierDifferent(true);
          break;
        case "reduc":
          nbPoints = this.compterReduc(true, true);
          break;
        case "lieu":
          nbPoints = this.comtperLieu(plateau[i][j].carte!.conditionGagneElement[0]);
          break;
        case "bouclier-different":
          nbPoints = this.compterBouclierDifferent(false);
          break;
        case "bouclier-double":
          nbPoints = this.compterCarteBouclier(2);
          break;
        case "bouclier-simple":
          nbPoints = this.compterCarteBouclier(1);
          break;
        case "piece-bourse":
          nbPoints = plateau[i][j].nbPieces;
          break;
        case "carte-retourne-indif":
          nbPoints = this.compteurCarteRetourne(true, true) >= 1 ? 1 : 0;
          break;
        case "carte-retourne-indif-absent":
          nbPoints = this.compteurCarteRetourne(true, true) === 0 ? 1 : 0;
          break;
        case "bourse":
          nbPoints = this.compterPieceEnBourse();
          break;
        case "cle":
          nbPoints = this.joueurEnCours!.cle;
          break;
        case "check-bourse-absent":
          nbPoints = this.compterCarteBourse() === 0 ? 1 : 0;
          break;
        case "compte-cadenas":
          nbPoints = this.compterCadenas();
          break;
        case "somme-argent-colonne":
          nbPoints = this.calculerSommeArgentColonne(j);
          break;
        case "somme-argent-ligne":
          nbPoints = this.calculerSommeArgentLigne(i);
          break;
        case "check-reduction-absente":
          nbPoints = this.compterReduc(true, true) === 0 ? 1 : 0;
          break;
        case "carte-somme-differente":
          nbPoints = this.compterCarteSommeDifferente(i, j);
          break;
      }
      plateau[i][j].score = nbPoints * plateau[i][j].carte!.nbPoint;
    }
  }

  private verifierEmplacementSpeciaux(ligne: number, colonne: number, nomEmplacement: string) {
    if (nomEmplacement === "croix") {
      return ((ligne === 0 && colonne === 1) || (ligne === 1 && colonne === 0) || (ligne === 1 && colonne === 2) || (ligne === 2 && colonne === 1));
    }
    if (nomEmplacement === "extremite") {
      return ((ligne === 0 && colonne === 0) || (ligne === 0 && colonne === 2) || (ligne === 2 && colonne === 0) || (ligne === 2 && colonne === 2));
    }
    return 0;
  }

  private compterCarteBouclier(nombreBoucliers: number): number {
    let inc = 0;
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (this.joueurEnCours!.plateau[i][j].carte) {
          const nomCarte = this.joueurEnCours!.plateau[i][j].nomCarte;
          if ((nomCarte !== "Retourné chateau" && nomCarte !== "Retourné village") &&
              this.joueurEnCours!.plateau[i][j].carte!.bouclier.length === nombreBoucliers) {
            inc += 1;
          }
        }
      }
    }
    return inc;
  }

  private compterCarteBourse(): number {
    let inc = 0;
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (this.joueurEnCours!.plateau[i][j].carte && this.joueurEnCours!.plateau[i][j].carte!.conditionGagne === "piece-bourse") {
          inc += 1;
        }
      }
    }
    return inc;
  }

  private compterCadenas(): number {
    let inc = 0;
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (this.joueurEnCours!.plateau[i][j].carte && this.joueurEnCours!.plateau[i][j].carte!.cadenas === true) {
          inc += 1;
        }
      }
    }
    return inc;
  }

  private calculerSommeArgentColonne(colonne: number): number {
    let somme = 0;
    for (let i = 0; i <= 2; i++) {
      if (this.joueurEnCours!.plateau[i][colonne].carte) {
        const nomCarte = this.joueurEnCours!.plateau[i][colonne].nomCarte;
        if (nomCarte !== "Retourné chateau" && nomCarte !== "Retourné village") {
          somme += this.joueurEnCours!.plateau[i][colonne].carte!.cout;
        }
      }
    }
    return somme;
  }

  private calculerSommeArgentLigne(ligne: number): number {
    let somme = 0;
    for (let j = 0; j <= 2; j++) {
      if (this.joueurEnCours!.plateau[ligne][j].carte) {
        const nomCarte = this.joueurEnCours!.plateau[ligne][j].nomCarte;
        if (nomCarte !== "Retourné chateau" && nomCarte !== "Retourné village") {
          somme += this.joueurEnCours!.plateau[ligne][j].carte!.cout;
        }
      }
    }
    return somme;
  }

  private compterCarteSommeDifferente(ligneActuelle: number, colonneActuelle: number): number {
    const coutsDifferents = new Set<number>();
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (this.joueurEnCours!.plateau[i][j].carte) {
          const nomCarte = this.joueurEnCours!.plateau[i][j].nomCarte;
          // Exclure les cartes retournées et collecter les coûts distincts
          if (nomCarte !== "Retourné chateau" && nomCarte !== "Retourné village") {
            coutsDifferents.add(this.joueurEnCours!.plateau[i][j].carte!.cout);
          }
        }
      }
    }
    return coutsDifferents.size;
  }

  private compteurCarteRetourne(village: boolean, chateau: boolean): number {
    let inc = 0;
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (this.joueurEnCours!.plateau[i][j].carte) {
          if (village && this.joueurEnCours!.plateau[i][j].nomCarte === "Retourné village") {
            inc += 1;
          } else if (chateau && this.joueurEnCours!.plateau[i][j].nomCarte === "Retourné chateau") {
            inc += 1;
          }
        }
      }
    }
    return inc;
  }

  private compterPieceEnBourse(): number {
    let inc = 0;
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (this.joueurEnCours!.plateau[i][j].carte) {
          if (this.joueurEnCours!.plateau[i][j].nbPieces) {
            inc += this.joueurEnCours!.plateau[i][j].nbPieces;
          }
        }
      }
    }
    return inc;
  }

  private comtperLieu(lieu: string): number {
    let inc = 0;
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (this.joueurEnCours!.plateau[i][j].carte) {
          if (this.joueurEnCours!.plateau[i][j].carte!.lieu === lieu) {
            inc += 1;
          }
        }
      }
    }
    return inc;
  }

  private compterReduc(village: boolean, chateau: boolean): number {
    let inc = 0;
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (this.joueurEnCours!.plateau[i][j].carte) {
          if (village && this.joueurEnCours!.plateau[i][j].carte!.reducVillage) {
            inc += 1;
          } else if (chateau && this.joueurEnCours!.plateau[i][j].carte!.reducChateau) {
            inc += 1;
          }
        }
      }
    }
    return inc;
  }

  private compterBouclierDifferent(absent: boolean) {
    const seen = new Set<string>();
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (this.joueurEnCours!.plateau[i][j].carte) {
          const boucliers = this.joueurEnCours!.plateau[i][j].carte!.bouclier;
          for (const bouclier of boucliers) {
            seen.add(bouclier);
          }
        }
      }
    }
    return (absent) ? 6 - seen.size : seen.size;
  }

  private verfiierEmplacementHorizontal(ligne: number, condition: string): boolean {
    switch (condition) {
      case "haut":
        return ligne === 0;
      case "milieu":
        return ligne === 1;
      case "bas":
        return ligne === 2;
      default:
        return false;
    }
  }

  private verfiierEmplacementVertical(colonne: number, condition: string): boolean {
    switch (condition) {
      case "gauche":
        return colonne === 0;
      case "milieu":
        return colonne === 1;
      case "droite":
        return colonne === 2;
      default:
        return false;
    }
  }

  private calculerGroupeLieu(liste: string[]): number {
    const tousLesLieux: string[] = [];
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (this.joueurEnCours?.plateau[i][j].carte !== undefined) {
          tousLesLieux.push(this.joueurEnCours?.plateau[i][j].carte!.lieu)
        }
      }
    }
    let lieuxDispo = [...tousLesLieux];
    let compteurGroupes = 0;

    if (liste[0].includes(":")) {
      let lieuToFind = liste[0].split(":")[0];
      let valeur = liste[0].split(":")[1];
      let tailleGroupe = parseInt(valeur, 10);

      let compteur: { [key: string]: number } = {};
      lieuxDispo.forEach(lieu => {
        compteur[lieu] = (compteur[lieu] || 0) + 1;
      });
      compteurGroupes += Math.floor(compteur[lieuToFind] / tailleGroupe);
    } else {
      while (liste.every(lieu => lieuxDispo.includes(lieu))) {
        for (const lieu of liste) {
          const index = lieuxDispo.indexOf(lieu);
          if (index !== -1) {
            lieuxDispo.splice(index, 1);
          }
        }
        compteurGroupes++;
      }
    }


    return compteurGroupes;
  }

  private calculerGroupeBouclier(liste: string[]): number {
    const tousLesBoucliers: string[] = [];
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (this.joueurEnCours?.plateau[i][j].carte !== undefined) {
          this.joueurEnCours?.plateau[i][j].carte?.bouclier.forEach((bouclier) => {
            tousLesBoucliers.push(bouclier);
          });
        }
      }
    }
    let boucliersDisponibles = [...tousLesBoucliers];
    let compteurGroupes = 0;
    if (liste[0].startsWith("identique")) {
      let valeur = liste[0].split(":")[1];
      let tailleGroupe = parseInt(valeur, 10);
      let compteur: { [key: string]: number } = {};
      boucliersDisponibles.forEach(couleur => {
        compteur[couleur] = (compteur[couleur] || 0) + 1;
      });
      let compteurGroupe = 0;
      for (let couleur in compteur) {
        compteurGroupe += Math.floor(compteur[couleur] / tailleGroupe);
      }
      return compteurGroupe;
    } else {
      while (liste.every(bouclier => boucliersDisponibles.includes(bouclier))) {
        for (const bouclier of liste) {
          const index = boucliersDisponibles.indexOf(bouclier);
          if (index !== -1) {
            boucliersDisponibles.splice(index, 1);
          }
        }
        compteurGroupes++;
      }
    }
    return compteurGroupes;
  }

  private compterCarteParCout(prix: number, superieurEgal: boolean, egal: boolean): number {
    let inc = 0;
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (superieurEgal && this.joueurEnCours?.plateau[i][j].carte !== undefined && this.joueurEnCours?.plateau[i][j].carte!.cout >= prix) {
          inc += 1;
        } else if (egal && this.joueurEnCours?.plateau[i][j].carte !== undefined && this.joueurEnCours?.plateau[i][j].carte!.cout === prix) {
          inc += 1;
        }
      }
    }
    return inc;
  }

  private controleBouclierAbsent(liste: string[]): boolean {
    let valueRetour: boolean = true;
    liste.forEach((bouclier) => {
      for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
          if (this.joueurEnCours?.plateau[i][j].carte && this.joueurEnCours?.plateau[i][j].carte?.bouclier.indexOf(bouclier) !== -1) {
            valueRetour = false;
          }
        }
      }
    });
    return valueRetour;
  }

  private calculerBouclierLigneColonne(ligne: number, colonne: number, bouclierRecherche: string): number {
    let nbBouclier = 0;
    if (bouclierRecherche !== "different") {
      for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
          if (i === ligne || j === colonne) {
            if (this.joueurEnCours!.plateau[i][j].carte) {
              nbBouclier += this.joueurEnCours!.plateau[i][j].carte!.bouclier.filter(item => item === bouclierRecherche).length;
            }
          }
        }
      }
    } else {
      const seen = new Set<string>();
      for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
          if (i === ligne || j === colonne) {
            const boucliers = this.joueurEnCours!.plateau[i][j].carte!.bouclier;
            for (const bouclier of boucliers) {
              seen.add(bouclier);
            }
          }
        }
      }
      nbBouclier = seen.size;
    }

    return nbBouclier;
  }

  private calculerBouclierLigne(ligne: number, bouclierRecherche: string): number {
    let nbBouclier = 0;
    if (bouclierRecherche !== "different") {
      for (let j = 0; j <= 2; j++) {
        if (this.joueurEnCours!.plateau[ligne][j].carte) {
          nbBouclier += this.joueurEnCours!.plateau[ligne][j].carte!.bouclier.filter(item => item === bouclierRecherche).length;
        }
      }
    } else {
      const seen = new Set<string>();
      for (let j = 0; j <= 2; j++) {
        if (this.joueurEnCours!.plateau[ligne][j].carte) {
          const boucliers = this.joueurEnCours!.plateau[ligne][j].carte!.bouclier;
          for (const bouclier of boucliers) {
            seen.add(bouclier);
          }
        }
      }
      nbBouclier = seen.size;
    }
    return nbBouclier;
  }

  private calculerBouclierColonne(colonne: number, bouclierRecherche: string) {
    let nbBouclier = 0;
    if (bouclierRecherche !== "different") {
      for (let i = 0; i <= 2; i++) {
        if (this.joueurEnCours!.plateau[i][colonne].carte) {
          nbBouclier += this.joueurEnCours!.plateau[i][colonne].carte!.bouclier.filter(item => item === bouclierRecherche).length;
        }
      }
    } else {
      const seen = new Set<string>();
      for (let i = 0; i <= 2; i++) {
        if (this.joueurEnCours!.plateau[i][colonne].carte) {
          const boucliers = this.joueurEnCours!.plateau[i][colonne].carte!.bouclier;
          for (const bouclier of boucliers) {
            seen.add(bouclier);
          }
        }
      }
      nbBouclier = seen.size;
    }
    return nbBouclier;
  }

  private updateJoueurEnCoursAndSave() {
    const index = this.joueurs.findIndex(joueur => joueur.user.id === this.joueurEnCours?.user.id);
    if (index !== -1) {
      this.joueurs[index] = { ...this.joueurEnCours! };
    }

    const roundRow: CountRoundRow[] = [];
    this.joueurs.forEach(joueur => {
      const player: CountRoundRow = {
        user: {
          position: 0,
          user: joueur.user
        },
        value: joueur.scoreTotal
      }
      roundRow.push(player);
    });

    const round: RoundRow[] = [{
      points: roundRow,
      row: 1
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
        const input = this.inputScores?.find(input => input.name === "piece_" + i + "_" + j);
        input?.reinit(this.joueurEnCours!.plateau[i][j].nbPieces);
        const autocomplete = this.autoCompletes?.find(autocomplete => autocomplete.name === "autocomplete_" + i + "_" + j);
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
    const input = this.inputScores?.find(input => input.name === "piece_" + i + "_" + j);
    input?.reinit(this.joueurEnCours!.plateau[i][j].nbPieces);
    this.calculerTableau();
  }

  changePieceEvent(numberPiece: number, nameElement: string) {
    let [i, j] = nameElement.split("_").map(Number);
    this.joueurEnCours!.plateau[i][j].nbPieces = numberPiece;
    this.calculerTableau();
  }

  changeCleEvent(nbCles: number) {
    this.joueurEnCours!.cle = nbCles;
    this.calculerTableau();
  }

  maxValue(element: string[] | undefined): number | undefined {
    if (element && element.length > 0) {
      return Number(element[0]);
    }
    return undefined;
  }

  ouvrirJoueurSuivant() {
    const joueur = this.joueurs.find(joueur => joueur.scoreTotal === 0);
    if (!joueur) {
      this.ouvrirJoueur(this.joueurs[0].user.id);
    }
    this.ouvrirJoueur(joueur?.user.id)
  }

  isJoueurWithZero(): boolean {
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
    this.winnerComponent?.loadWinners(this.generateRound());
  }

  private generateRound() : CountRoundRow[] {
    console.log(this.table);
    const winners: CountRoundRow[] = this.table!.round[0].points;

    winners.sort((a, b) => b.value - a.value);
    winners.forEach((winner, index) => {
      winner.user.position = index + 1;
    });
    return winners;
  }

  closeGame() {
    this.table!.historic[formatDateNowToKey()] = this.generateRound();
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
