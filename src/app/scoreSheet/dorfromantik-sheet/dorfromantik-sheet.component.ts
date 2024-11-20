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
  scoreFinal : number = 0;
  nbCroix : number = 0;
  libelleScore : string = "";
  contenuDebloque : string[] = [];

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
      bergere : 0
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
      resultat += this.dataPartie.isCirque?10:0;
      this.scoreFinal = resultat;
      var res = this.getLibelleScore(resultat);
      this.libelleScore = res[0];
      this.nbCroix = res[1];
      this.getContenuDebloque();
      this.savePartie();
      this.isScoreCalcule = true;
    }
  }

  private savePartie(){
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

  private getLibelleScore(score : number) : [string,number] {
    if(score > 0 && score <= 10) {return ["libelleA",1];}
    else if (score > 7 && score <= 40) {return ["libelleB",2]}
    return ["",0];
  }

  private getContenuDebloque(){
    this.contenuDebloque = [];
    if(this.dataPartie){
      if(this.getScoreTableau(this.dataPartie.listePointForet) == 30) {this.contenuDebloque.push("Cabane dans la fôret débloqué si disponible")}
    }
  }

  private getScoreTableau(liste: string[]): number {
    return liste
      .map(item => parseInt(item.replace(/[^\d]/g, ''), 10))
      .reduce((sum, num) => sum + num, 0);
  }
}
