import { CommonModule } from '@angular/common';
import { Component, inject, QueryList, ViewChildren } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TableService } from '../../service/table.service';
import { Table } from '../../models/table.model';
import { ActivatedRoute } from '@angular/router';
import { InputScoreComponent } from '../../components/input-score/input-score.component';
import { CountRoundRow, RoundRow } from '../../models/sheet';

export type DataDorf = {
  listePointForet: string[],
  listePointVillage: string[],
  listePointChamp: string[],
  listePointRiviere: string[],
  listePointCheminDeFer: string[],

  longueRiviere: number,
  longCheminDeFer: number,

  drapeauForetA: number,
  drapeauForetB: number,
  drapeauForetC: number,
  drapeauForetD: number,
  drapeauChampA: number,
  drapeauChampB: number,
  drapeauChampC: number,
  drapeauChampD: number,
  drapeauVillageA: number,
  drapeauVillageB: number,
  drapeauVillageC: number,
  drapeauVillageD: number,


  doublageForet: string[],
  doublageVillage: string[],
  doublageChamp: string[],
  doublageRiviere: string[],
  doublageCheminDeFer: string[],

  isCirque: boolean,
  gare: number,
  portDePlaisance: number,
  chantier: number,
  coeurA: number,
  coeurB: number,
  coeurC: number,
  coeurD: number,
  coeurDore: number,
  aiguilleur: number,
  mongolfiere: number,
  colinne: number,
  bergere: number,
}

@Component({
  selector: 'app-dorfromantik-sheet',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputScoreComponent],
  templateUrl: './dorfromantik-sheet.component.html',
  styleUrl: './dorfromantik-sheet.component.css'
})
export class DorfromantikSheetComponent {

  private tableService = inject(TableService);
  @ViewChildren(InputScoreComponent) inputScores: QueryList<InputScoreComponent> | undefined;
  table: Table | undefined;

  dataPartie: DataDorf | undefined = undefined;
  isScoreCalcule: boolean = false;
  scoreFinal: number = 0;
  nbCroix: number = 0;
  libelleScore: string = "";
  contenuDebloque: string[] = [];

  constructor(private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const idTable = +params['idTable'];
      if (idTable) {
        this.tableService.getTable(idTable).subscribe({
          next: (table: Table | undefined) => {
            if (table) {
              this.table = table;
              if (this.table?.specificData !== undefined && this.table.specificData !== "") {
                console.log("Partie en cours");
                this.dataPartie = JSON.parse(this.table.specificData);
                this.refreshInputScore();
                this.calculerScore();
              } else {
                console.log("Nouvelle partie");
                this.newPartie();
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

  private newPartie() {
    const newPartie: DataDorf = {
      listePointForet: [],
      listePointVillage: [],
      listePointChamp: [],
      listePointRiviere: [],
      listePointCheminDeFer: [],

      longueRiviere: 0,
      longCheminDeFer: 0,

      drapeauForetA: 0,
      drapeauForetB: 0,
      drapeauForetC: 0,
      drapeauForetD: 0,
      drapeauChampA: 0,
      drapeauChampB: 0,
      drapeauChampC: 0,
      drapeauChampD: 0,
      drapeauVillageA: 0,
      drapeauVillageB: 0,
      drapeauVillageC: 0,
      drapeauVillageD: 0,


      doublageForet: [],
      doublageVillage: [],
      doublageChamp: [],
      doublageRiviere: [],
      doublageCheminDeFer: [],

      isCirque: false,
      gare: 0,
      portDePlaisance: 0,
      chantier: 0,
      coeurA: 0,
      coeurB: 0,
      coeurC: 0,
      coeurD: 0,
      coeurDore: 0,
      aiguilleur: 0,
      colinne: 0,
      mongolfiere: 0,
      bergere: 0
    }

    this.dataPartie = newPartie;
    this.refreshInputScore();
  }

  private refreshInputScore() {
    this.inputScores?.forEach((input) => {
      switch (input.name) {
        case "inputForetA":
          input.reinit(this.dataPartie!.drapeauForetA);
          break;
        case "inputForetB":
          input.reinit(this.dataPartie!.drapeauForetB);
          break;
        case "inputForetC":
          input.reinit(this.dataPartie!.drapeauForetC);
          break;
        case "inputForetD":
          input.reinit(this.dataPartie!.drapeauForetD);
          break;
        case "inputChampA":
          input.reinit(this.dataPartie!.drapeauChampA);
          break;
        case "inputChampB":
          input.reinit(this.dataPartie!.drapeauChampB);
          break;
        case "inputChampC":
          input.reinit(this.dataPartie!.drapeauChampC);
          break;
        case "inputChampD":
          input.reinit(this.dataPartie!.drapeauChampD);
          break;
        case "inputVillageA":
          input.reinit(this.dataPartie!.drapeauVillageA);
          break;
        case "inputVillageB":
          input.reinit(this.dataPartie!.drapeauVillageB);
          break;
        case "inputVillageC":
          input.reinit(this.dataPartie!.drapeauVillageC);
          break;
        case "inputVillageD":
          input.reinit(this.dataPartie!.drapeauVillageD);
          break;
        case "inputCoeurA":
          input.reinit(this.dataPartie!.coeurA);
          break;
        case "inputCoeurB":
          input.reinit(this.dataPartie!.coeurB);
          break;
        case "inputCoeurC":
          input.reinit(this.dataPartie!.coeurC);
          break;
        case "inputCoeurD":
          input.reinit(this.dataPartie!.coeurD);
          break;
        case "inputCoeurDore":
          input.reinit(this.dataPartie!.coeurDore);
          break;
        case "inputAiguilleur":
          input.reinit(this.dataPartie!.aiguilleur);
          break;
        case "inputChantier":
          input.reinit(this.dataPartie!.chantier);
          break;
        case "inputGare":
          input.reinit(this.dataPartie!.gare);
          break;
        case "inputPort":
          input.reinit(this.dataPartie!.portDePlaisance);
          break;
        case "inputColinne":
          input.reinit(this.dataPartie!.colinne);
          break;
        case "inputMongolfiere":
          input.reinit(this.dataPartie!.mongolfiere);
          break;
        case "inputBergere":
          input.reinit(this.dataPartie!.bergere);
          break;
        case "inputLongueRiviere":
          input.reinit(this.dataPartie!.longueRiviere);
          break;
        case "inputLongCheminDeFer":
          input.reinit(this.dataPartie!.longCheminDeFer);
          break;
        default:
          console.warn(`Nom d'entrée inconnu : ${input.name}`);
          break;
      }
    });
  }

  changeCirque() {
    if (this.dataPartie) {
      this.dataPartie.isCirque = !this.dataPartie.isCirque;
    }
  }

  updateFromInputScore(value: number, name: string) {
    if (this.dataPartie === undefined) {
      return;
    }

    switch (name) {
      case "inputForetA":
        this.dataPartie!.drapeauForetA = value;
        break;
      case "inputForetB":
        this.dataPartie!.drapeauForetB = value;
        break;
      case "inputForetC":
        this.dataPartie!.drapeauForetC = value;
        break;
      case "inputForetD":
        this.dataPartie!.drapeauForetD = value;
        break;
      case "inputChampA":
        this.dataPartie!.drapeauChampA = value;
        break;
      case "inputChampB":
        this.dataPartie!.drapeauChampB = value;
        break;
      case "inputChampC":
        this.dataPartie!.drapeauChampC = value;
        break;
      case "inputChampD":
        this.dataPartie!.drapeauChampD = value;
        break;
      case "inputVillageA":
        this.dataPartie!.drapeauVillageA = value;
        break;
      case "inputVillageB":
        this.dataPartie!.drapeauVillageB = value;
        break;
      case "inputVillageC":
        this.dataPartie!.drapeauVillageC = value;
        break;
      case "inputVillageD":
        this.dataPartie!.drapeauVillageD = value;
        break;
      case "inputCoeurA":
        this.dataPartie!.coeurA = value;
        break;
      case "inputCoeurB":
        this.dataPartie!.coeurB = value;
        break;
      case "inputCoeurC":
        this.dataPartie!.coeurC = value;
        break;
      case "inputCoeurD":
        this.dataPartie!.coeurD = value;
        break;
      case "inputCoeurDore":
        this.dataPartie!.coeurDore = value;
        break;
      case "inputAiguilleur":
        this.dataPartie!.aiguilleur = value;
        break;
      case "inputChantier":
        this.dataPartie!.chantier = value;
        break;
      case "inputGare":
        this.dataPartie!.gare = value;
        break;
      case "inputPort":
        this.dataPartie!.portDePlaisance = value;
        break;
      case "inputColinne":
        this.dataPartie!.colinne = value;
        break;
      case "inputMongolfiere":
        this.dataPartie!.mongolfiere = value;
        break;
      case "inputBergere":
        this.dataPartie!.bergere = value;
        break;
      case "inputLongueRiviere":
        this.dataPartie!.longueRiviere = value;
        break;
      case "inputLongCheminDeFer":
        this.dataPartie!.longCheminDeFer = value;
        break;
      default:
        console.warn(`Nom d'entrée inconnu`);
        break;
    }
  }

  selectZone(zone: string, point: string) {
    switch (zone) {
      case "foret-double":
        if (this.dataPartie!.doublageForet.indexOf(point) === -1) {
          this.dataPartie!.doublageForet.push(point);
        } else {
          this.dataPartie!.doublageForet.splice(this.dataPartie!.doublageForet.indexOf(point));
        }
        break;
      case "champ-double":
        if (this.dataPartie!.doublageChamp.indexOf(point) === -1) {
          this.dataPartie!.doublageChamp.push(point);
        } else {
          this.dataPartie!.doublageChamp.splice(this.dataPartie!.doublageChamp.indexOf(point));
        }
        break;
      case "village-double":
        if (this.dataPartie!.doublageVillage.indexOf(point) === -1) {
          this.dataPartie!.doublageVillage.push(point);
        } else {
          this.dataPartie!.doublageVillage.splice(this.dataPartie!.doublageVillage.indexOf(point));
        }
        break;
      case "riviere-double":
        if (this.dataPartie!.doublageRiviere.indexOf(point) === -1) {
          this.dataPartie!.doublageRiviere.push(point);
        } else {
          this.dataPartie!.doublageRiviere.splice(this.dataPartie!.doublageRiviere.indexOf(point));
        }
        break;
      case "cheminDeFer-double":
        if (this.dataPartie!.doublageCheminDeFer.indexOf(point) === -1) {
          this.dataPartie!.doublageCheminDeFer.push(point);
        } else {
          this.dataPartie!.doublageCheminDeFer.splice(this.dataPartie!.doublageCheminDeFer.indexOf(point));
        }
        break;
      case "foret":
        if (this.dataPartie!.listePointForet.indexOf(point) === -1) {
          this.dataPartie!.listePointForet.push(point);
        } else {
          this.dataPartie!.listePointForet.splice(this.dataPartie!.listePointForet.indexOf(point));
        }
        break;
      case "champ":
        if (this.dataPartie!.listePointChamp.indexOf(point) === -1) {
          this.dataPartie!.listePointChamp.push(point);
        } else {
          this.dataPartie!.listePointChamp.splice(this.dataPartie!.listePointChamp.indexOf(point));
        }
        break;
      case "village":
        if (this.dataPartie!.listePointVillage.indexOf(point) === -1) {
          this.dataPartie!.listePointVillage.push(point);
        } else {
          this.dataPartie!.listePointVillage.splice(this.dataPartie!.listePointVillage.indexOf(point));
        }
        break;
      case "riviere":
        if (this.dataPartie!.listePointRiviere.indexOf(point) === -1) {
          this.dataPartie!.listePointRiviere.push(point);
        } else {
          this.dataPartie!.listePointRiviere.splice(this.dataPartie!.listePointRiviere.indexOf(point));
        }
        break;
      case "cheminDeFer":
        if (this.dataPartie!.listePointCheminDeFer.indexOf(point) === -1) {
          this.dataPartie!.listePointCheminDeFer.push(point);
        } else {
          this.dataPartie!.listePointCheminDeFer.splice(this.dataPartie!.listePointCheminDeFer.indexOf(point));
        }
        break;
    }
  }

  isSelectedBouton(zone: string, point: string): boolean {
    if (this.dataPartie === undefined) {
      return false;
    }
    switch (zone) {
      case "foret-double":
        return this.dataPartie!.doublageForet.indexOf(point) !== -1;
      case "champ-double":
        return this.dataPartie!.doublageChamp.indexOf(point) !== -1;
      case "village-double":
        return this.dataPartie!.doublageVillage.indexOf(point) !== -1;
      case "riviere-double":
        return this.dataPartie!.doublageRiviere.indexOf(point) !== -1;
      case "cheminDeFer-double":
        return this.dataPartie!.doublageCheminDeFer.indexOf(point) !== -1;
      case "foret":
        return this.dataPartie!.listePointForet.indexOf(point) !== -1;
      case "champ":
        return this.dataPartie!.listePointChamp.indexOf(point) !== -1;
      case "village":
        return this.dataPartie!.listePointVillage.indexOf(point) !== -1;
      case "riviere":
        return this.dataPartie!.listePointRiviere.indexOf(point) !== -1;
      case "cheminDeFer":
        return this.dataPartie!.listePointCheminDeFer.indexOf(point) !== -1;
      default:
        return false;
    }
  }

  calculerScore() {
    if (this.dataPartie) {
      let resultat = 0;
      resultat += this.getScoreTableau(this.dataPartie.listePointForet);
      resultat += this.getScoreTableau(this.dataPartie.listePointChamp);
      resultat += this.getScoreTableau(this.dataPartie.listePointVillage);
      resultat += this.getScoreTableau(this.dataPartie.listePointRiviere);
      resultat += this.getScoreTableau(this.dataPartie.listePointCheminDeFer);
      resultat += this.getScoreTableau(this.dataPartie.doublageForet);
      resultat += this.getScoreTableau(this.dataPartie.doublageChamp);
      resultat += this.getScoreTableau(this.dataPartie.doublageVillage);
      resultat += this.getScoreTableau(this.dataPartie.doublageRiviere);
      resultat += this.getScoreTableau(this.dataPartie.doublageCheminDeFer);
      resultat += this.dataPartie.longueRiviere;
      resultat += this.dataPartie.longCheminDeFer;
      resultat += this.dataPartie.drapeauChampA;
      resultat += this.dataPartie.drapeauChampB;
      resultat += this.dataPartie.drapeauChampC;
      resultat += this.dataPartie.drapeauChampD;
      resultat += this.dataPartie.drapeauForetA;
      resultat += this.dataPartie.drapeauForetB;
      resultat += this.dataPartie.drapeauForetC;
      resultat += this.dataPartie.drapeauForetD;
      resultat += this.dataPartie.drapeauVillageA;
      resultat += this.dataPartie.drapeauVillageB;
      resultat += this.dataPartie.drapeauVillageC;
      resultat += this.dataPartie.drapeauVillageD;
      resultat += this.dataPartie.coeurA;
      resultat += this.dataPartie.coeurB;
      resultat += this.dataPartie.coeurC;
      resultat += this.dataPartie.coeurD;
      resultat += this.dataPartie.coeurDore * 2;
      resultat += this.dataPartie.colinne * 2;
      resultat += this.dataPartie.aiguilleur * 2;
      resultat += this.dataPartie.mongolfiere * 2;
      resultat += this.dataPartie.bergere;
      resultat += this.dataPartie.portDePlaisance;
      resultat += this.dataPartie.gare;
      resultat += this.dataPartie.chantier * 3;
      resultat += this.dataPartie.isCirque ? 10 : 0;
      this.scoreFinal = resultat;
      var res = this.getLibelleScore(resultat);
      this.libelleScore = res[0];
      this.nbCroix = res[1];
      this.getContenuDebloque();
      this.savePartie();
      this.isScoreCalcule = true;
    }
  }

  private savePartie() {
    const roundRow: CountRoundRow[] = [];
    this.table!.users.forEach(joueur => {
      const player: CountRoundRow = {
        user: {
          position: 0,
          user: joueur
        },
        value: this.scoreFinal
      }
      roundRow.push(player);
    });

    const round: RoundRow[] = [{
      points: roundRow,
      row: 1
    }]
    this.table!.round = round;
    this.table!.specificData = JSON.stringify(this.dataPartie);
    this.tableService.updateTable(this.table!).subscribe({
      next: () => {
      },
      error: (error) => {
        console.error("Error update table:", error);
      }
    });
  }

  private getLibelleScore(score: number): [string, number] {
    if (score >= 0 && score < 100) { return ["Vagabonde", 1]; }
    else if (score >= 100 && score < 110) { return ["Vendeur de journaux", 2] }
    else if (score >= 110 && score < 120) { return ["Pêcheuse", 3] }
    else if (score >= 120 && score < 130) { return ["Cocher", 3] }
    else if (score >= 130 && score < 140) { return ["Surveillante de nuit", 4] }
    else if (score >= 140 && score < 150) { return ["Acteur", 4] }
    else if (score >= 150 && score < 160) { return ["Gouvernante", 5] }
    else if (score >= 160 && score < 170) { return ["Garde forestier", 5] }
    else if (score >= 170 && score < 180) { return ["Fermière", 6] }
    else if (score >= 180 && score < 190) { return ["Ingénieur", 6] }
    else if (score >= 190 && score < 200) { return ["Madame loyale", 7] }
    else if (score >= 200 && score < 210) { return ["Capitaine", 7] }
    else if (score >= 210 && score < 220) { return ["Contremaître", 8] }
    else if (score >= 220 && score < 230) { return ["Chef de gare", 8] }
    else if (score >= 230 && score < 240) { return ["Photographe", 9] }
    else if (score >= 250 && score < 250) { return ["Marchand", 9] }
    else if (score >= 250 && score < 260) { return ["Architecte", 10] }
    else if (score >= 260 && score < 270) { return ["Inventeur", 10] }
    else if (score >= 270 && score < 280) { return ["Astronome", 11] }
    else if (score >= 280 && score < 290) { return ["Docteur", 11] }
    else if (score >= 290 && score < 300) { return ["Diplomate", 12] }
    else if (score >= 310 && score < 310) { return ["Aérostier", 12] }
    else if (score >= 320 && score < 320) { return ["Industrielle", 13] }
    else if (score >= 320 && score < 330) { return ["Maire", 13] }
    else if (score >= 330 && score < 340) { return ["Conseillère", 14] }
    else if (score >= 340 && score < 350) { return ["Magnat", 14] }
    else if (score >= 350 && score < 375) { return ["Baronne", 15] }
    else if (score >= 375 && score < 400) { return ["Prince", 15] }
    else if (score >= 400) { return ["Impératrice", 15] }
    return ["", 0];
  }

  private getContenuDebloque() {
    this.contenuDebloque = [];
    if (this.dataPartie) {
      if (this.getScoreTableau(this.dataPartie.listePointForet) == 30 && this.dataPartie.doublageForet.length == 0) { this.contenuDebloque.push("Succès Cabane dans la fôret débloqué si disponible") }
      if (this.getScoreTableau(this.dataPartie.listePointChamp) == 30 && this.dataPartie.doublageChamp.length == 0) { this.contenuDebloque.push("Succès Fête des moissons débloqué si disponible") }
      if (this.getScoreTableau(this.dataPartie.listePointVillage) == 30 && this.dataPartie.doublageVillage.length == 0) { this.contenuDebloque.push("Succès Tour de guet débloqué si disponible") }
      if (this.getScoreTableau(this.dataPartie.listePointRiviere) == 30 && this.dataPartie.doublageRiviere.length == 0) { this.contenuDebloque.push("Succès Bateau de plaisance débloqué si disponible") }
      if (this.getScoreTableau(this.dataPartie.listePointCheminDeFer) == 30 && this.dataPartie.doublageCheminDeFer.length == 0) { this.contenuDebloque.push("Succès Locomotive débloqué si disponible") }
      if (this.checkFestivalDrapeau(this.dataPartie.drapeauForetA, this.dataPartie.drapeauForetB, this.dataPartie.drapeauForetC, this.dataPartie.drapeauForetD) ||
        this.checkFestivalDrapeau(this.dataPartie.drapeauChampA, this.dataPartie.drapeauChampB, this.dataPartie.drapeauChampC, this.dataPartie.drapeauChampD) ||
        this.checkFestivalDrapeau(this.dataPartie.drapeauVillageA, this.dataPartie.drapeauVillageB, this.dataPartie.drapeauVillageC, this.dataPartie.drapeauVillageD)) { this.contenuDebloque.push("Succès Festival de drapeaux débloqué si disponible") }
      if (this.scoreFinal >= 300 && this.dataPartie.mongolfiere === 0) { this.contenuDebloque.push("Succès Site de décollage débloqué si disponible") }
      if ((this.dataPartie.coeurA + this.dataPartie.coeurB + this.dataPartie.coeurC + this.dataPartie.coeurD) >= 18 && this.dataPartie.coeurDore === 0) { this.contenuDebloque.push("Succès Coeur doré débloqué si disponible") }
      if ((this.getScoreTableau(this.dataPartie.listePointChamp) +
        this.getScoreTableau(this.dataPartie.listePointForet) +
        this.getScoreTableau(this.dataPartie.listePointVillage) +
        this.getScoreTableau(this.dataPartie.listePointCheminDeFer) +
        this.getScoreTableau(this.dataPartie.listePointRiviere) +
        this.dataPartie.chantier === 0)) { this.contenuDebloque.push("Succès Chantier de construction débloqué si disponible") }
      if(this.scoreFinal >= 180 && this.dataPartie.longueRiviere >= 12 && this.dataPartie.portDePlaisance === 0) {this.contenuDebloque.push("Succès Port de plaisance débloqué si disponible")}
      if(this.scoreFinal >= 180 && this.dataPartie.longCheminDeFer >= 12 && this.dataPartie.gare === 0) {this.contenuDebloque.push("Succès Gare ferrovière débloqué si disponible")}
      if(this.scoreFinal >= 200 && this.dataPartie.mongolfiere === 0 && this.dataPartie.coeurDore === 0 && this.dataPartie.chantier === 0 && this.dataPartie.portDePlaisance === 0 && this.dataPartie.gare === 0) {this.contenuDebloque.push("Succès La route du succès débloqué si disponible, vous pouvez ouvrir la bôite 5")}
    }
  }

  checkFestivalDrapeau(a: number, b: number, c: number, d: number): boolean {
    const variables = [a, b, c, d];
    const occurrences = new Map<number, number>();
    for (const value of variables) {
      occurrences.set(value, (occurrences.get(value) || 0) + 1);
    }
    const hasThreeSame = Array.from(occurrences.values()).includes(3);
    const hasZero = variables.includes(0);
    const sum = variables.reduce((acc, val) => acc + val, 0);
    return hasThreeSame && hasZero && sum >= 40;
  }

  private getScoreTableau(liste: string[]): number {
    return liste
      .map(item => parseInt(item.replace(/[^\d]/g, ''), 10))
      .reduce((sum, num) => sum + num, 0);
  }
}
