import { CommonModule } from '@angular/common';
import { Component, inject, QueryList, ViewChildren } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TableService } from '../../service/table.service';
import { Table } from '../../models/table.model';
import { ActivatedRoute } from '@angular/router';
import { InputScoreComponent } from '../../components/input-score/input-score.component';

export type DataDorf  = {
  listePointForet : number[],
  listePointVillage : number[],
  listePointChamp : number[],
  listePointRiviere : number[],
  listePointCheminDeFer : number[],

  longueRiviere: number,
  longCheminDeFer: number,

  drapeauForetA : number,
  drapeauForetB : number,
  drapeauForetC : number,
  drapeauForetD : number,
  drapeauChampA : number,
  drapeauChampB : number,
  drapeauChampC : number,
  drapeauChampD : number,
  drapeauVillageA : number,
  drapeauVillageB : number,
  drapeauVillageC : number,
  drapeauVillageD : number,


  doublageForet : number[],
  doublageVillage : number[],
  doublageChamp : number[],
  doublageRiviere : number[],
  doublageCheminDeFer : number[],

  isCirque : boolean,
  isGareFerroviere : boolean,
  isPOrtDePlaisance : boolean,
  coeurA : number,
  coeurB : number,
  coeurC : number,
  coeurD : number,
  coeurDore : number,
  aiguilleur : number,
  mongolfiere : number,
  colinne : number,
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
    const newPartie : DataDorf = {
      listePointForet : [],
      listePointVillage : [],
      listePointChamp : [],
      listePointRiviere : [],
      listePointCheminDeFer : [],

      longueRiviere: 0,
      longCheminDeFer: 0,

      drapeauForetA : 0,
      drapeauForetB : 0,
      drapeauForetC : 0,
      drapeauForetD : 0,
      drapeauChampA : 0,
      drapeauChampB : 0,
      drapeauChampC : 0,
      drapeauChampD : 0,
      drapeauVillageA : 0,
      drapeauVillageB : 0,
      drapeauVillageC : 0,
      drapeauVillageD : 0,


      doublageForet : [],
      doublageVillage : [],
      doublageChamp : [],
      doublageRiviere : [],
      doublageCheminDeFer : [],

      isCirque : false,
      isGareFerroviere : false,
      isPOrtDePlaisance : false,
      coeurA : 0,
      coeurB : 0,
      coeurC : 0,
      coeurD : 0,
      coeurDore : 0,
      aiguilleur : 0,
      colinne : 0,
      mongolfiere : 0,
    }

    this.dataPartie = newPartie;
    this.refreshInputScore();
  }

  private refreshInputScore(){
    this.inputScores?.forEach((input) => {
      if(input.name === "inputForetA") {input.reinit(this.dataPartie!.drapeauForetA)}
      if(input.name === "inputForetB") {input.reinit(this.dataPartie!.drapeauForetB)}
      if(input.name === "inputForetC") {input.reinit(this.dataPartie!.drapeauForetC)}
      if(input.name === "inputForetD") {input.reinit(this.dataPartie!.drapeauForetD)}
      if(input.name === "inputChampA") {input.reinit(this.dataPartie!.drapeauChampA)}
      if(input.name === "inputChampB") {input.reinit(this.dataPartie!.drapeauChampB)}
      if(input.name === "inputChampC") {input.reinit(this.dataPartie!.drapeauChampC)}
      if(input.name === "inputChampD") {input.reinit(this.dataPartie!.drapeauChampD)}
      if(input.name === "inputVillageA") {input.reinit(this.dataPartie!.drapeauVillageA)}
      if(input.name === "inputVillageB") {input.reinit(this.dataPartie!.drapeauVillageB)}
      if(input.name === "inputVillageC") {input.reinit(this.dataPartie!.drapeauVillageC)}
      if(input.name === "inputVillageD") {input.reinit(this.dataPartie!.drapeauVillageD)}
      if(input.name === "inputCoeurA") {input.reinit(this.dataPartie!.coeurA)}
      if(input.name === "inputCoeurB") {input.reinit(this.dataPartie!.coeurB)}
      if(input.name === "inputCoeurC") {input.reinit(this.dataPartie!.coeurC)}
      if(input.name === "inputCoeurD") {input.reinit(this.dataPartie!.coeurD)}
      if(input.name === "inputCoeurDore") {input.reinit(this.dataPartie!.coeurDore)}
      if(input.name === "inputAiguilleur") {input.reinit(this.dataPartie!.aiguilleur)}
      if(input.name === "inputColinne") {input.reinit(this.dataPartie!.colinne)}
      if(input.name === "inputMongolfiere") {input.reinit(this.dataPartie!.mongolfiere)}
      if(input.name === "inputLongueRiviere") {input.reinit(this.dataPartie!.longueRiviere)}
      if(input.name === "inputLongCheminDeFer") {input.reinit(this.dataPartie!.longCheminDeFer)}
    });
  }

  selectZone(nom: string, point: number){

  }


}
