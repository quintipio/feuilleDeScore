import { Injectable } from '@angular/core';

export interface CarteChateauCombo {
  bouclier: string[],
  lieu: string,
  cout: number,
  nbPoint: number,
  reducVillage: boolean,
  reducChateau: boolean,
  conditionGagne: string,
  conditionGagneElement: string[],
  cadenas: boolean,
}



@Injectable({
  providedIn: 'root',
})
export class CarteService {

  loadCartes(): { [key: string]: CarteChateauCombo } {
    return this.cartesJson as { [key: string]: CarteChateauCombo };
  }

  private cartesJson = {
    "Retourné chateau": {
      "bouclier": [],
      "lieu": "",
      "cout": -1,
      "nbPoint": -1,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "",
      "conditionGagneElement": [],
      "cadenas": false
    },
    "Retourné village": {
      "bouclier": [],
      "lieu": "",
      "cout": -1,
      "nbPoint": -1,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "",
      "conditionGagneElement": [],
      "cadenas": false
    },
    "Bouffon": {
      "bouclier": ["bleu"],
      "lieu": "chateau",
      "cout": 3,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne-colonne",
      "conditionGagneElement": ["bleu"],
      "cadenas": false
    },

    "Baron": {
      "bouclier": ["bleu"],
      "lieu": "chateau",
      "cout": 3,
      "nbPoint": 10,
      "reducVillage": true,
      "reducChateau": true,
      "conditionGagne": "bouclier-absent",
      "conditionGagneElement": ["jaune"],
      "cadenas": false
    },

    "Garde royal": {
      "bouclier": ["bleu", "rouge"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-colonne",
      "conditionGagneElement": ["bleu"],
      "cadenas": false
    },

    "Mécène": {
      "bouclier": ["vert"],
      "lieu": "chateau",
      "cout": 7,
      "nbPoint": 5,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "cout-cartes-plus",
      "conditionGagneElement": ["5"],
      "cadenas": false
    },

    "Souffleur de verre": {
      "bouclier": ["orange"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 4,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "groupe-bouclier",
      "conditionGagneElement": ["violet", "orange"],
      "cadenas": false
    },

    "Nonne": {
      "bouclier": ["violet"],
      "lieu": "chateau",
      "cout": 3,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-colonne",
      "conditionGagneElement": ["violet"],
      "cadenas": false
    },

    "Juge": {
      "bouclier": ["vert"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "groupe-lieu",
      "conditionGagneElement": ["village", "chateau"],
      "cadenas": false
    },

    "Intendant": {
      "bouclier": ["bleu"],
      "lieu": "chateau",
      "cout": 0,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["3"],
      "cadenas": false
    },

    "Son altesse": {
      "bouclier": ["bleu", "violet"],
      "lieu": "chateau",
      "cout": 6,
      "nbPoint": 4,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-colonne",
      "conditionGagneElement": ["bleu"],
      "cadenas": false
    },

    "Mère supérieure": {
      "bouclier": ["violet", "violet"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 5,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-horizontal",
      "conditionGagneElement": ["haut"],
      "cadenas": false
    },

    "Sa sainteté": {
      "bouclier": ["violet"],
      "lieu": "chateau",
      "cout": 7,
      "nbPoint": 6,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-different-absent",
      "conditionGagneElement": [],
      "cadenas": false
    },

    "Capitaine": {
      "bouclier": ["rouge", "rouge"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 8,
      "reducVillage": true,
      "reducChateau": false,
      "conditionGagne": "emplacement-vertical",
      "conditionGagneElement": ["droite"],
      "cadenas": false
    },

    "Apothicaire": {
      "bouclier": ["vert"],
      "lieu": "chateau",
      "cout": 3,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": true,
      "conditionGagne": "bouclier-colonne",
      "conditionGagneElement": ["vert"],
      "cadenas": false
    },

    "Alchimiste": {
      "bouclier": ["vert"],
      "lieu": "chateau",
      "cout": 6,
      "nbPoint": 4,
      "reducVillage": true,
      "reducChateau": true,
      "conditionGagne": "reduc",
      "conditionGagneElement": [],
      "cadenas": false
    },

    "Prince": {
      "bouclier": ["bleu"],
      "lieu": "chateau",
      "cout": 6,
      "nbPoint": 4,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["bleu"],
      "cadenas": false
    },

    "Doyenne": {
      "bouclier": ["bleu", "bleu"],
      "lieu": "chateau",
      "cout": 3,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["5"],
      "cadenas": false
    },

    "Chanceliere": {
      "bouclier": ["bleu", "vert"],
      "lieu": "chateau",
      "cout": 6,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "lieu",
      "conditionGagneElement": ["chateau"],
      "cadenas": false
    },

    "Architecte": {
      "bouclier": ["vert"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 2,
      "reducVillage": true,
      "reducChateau": false,
      "conditionGagne": "bouclier-different",
      "conditionGagneElement": [],
      "cadenas": false
    },

    "Maitre de guilde": {
      "bouclier": ["orange", "orange"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 5,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-horizontal",
      "conditionGagneElement": ["bas"],
      "cadenas": false
    },

    "Veilleur": {
      "bouclier": ["rouge"],
      "lieu": "chateau",
      "cout": 6,
      "nbPoint": 4,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-colonne",
      "conditionGagneElement": ["different"],
      "cadenas": false
    },

    "Chevaleresse": {
      "bouclier": ["rouge"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne-colonne",
      "conditionGagneElement": ["bleu"],
      "cadenas": false
    },

    "Générale": {
      "bouclier": ["rouge"],
      "lieu": "chateau",
      "cout": 7,
      "nbPoint": 6,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "groupe-bouclier",
      "conditionGagneElement": ["identique:3"],
      "cadenas": false
    },

    "Chatelaine": {
      "bouclier": ["bleu", "orange"],
      "lieu": "chateau",
      "cout": 2,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": true,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["different"],
      "cadenas": false
    },

    "Duchesse": {
      "bouclier": ["bleu", "bleu"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 8,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-horizontal",
      "conditionGagneElement": ["haut"],
      "cadenas": false
    },

    "Sa majesté la reine": {
      "bouclier": ["bleu"],
      "lieu": "chateau",
      "cout": 7,
      "nbPoint": 10,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "groupe-bouclier",
      "conditionGagneElement": ["bleu", "vert", "orange"],
      "cadenas": false
    },

    "Officier": {
      "bouclier": ["rouge"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 4,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "groupe-bouclier",
      "conditionGagneElement": ["bleu", "rouge"],
      "cadenas": false
    },

    "Astronome": {
      "bouclier": ["vert", "vert"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 8,
      "reducVillage": false,
      "reducChateau": true,
      "conditionGagne": "emplacement-vertical",
      "conditionGagneElement": ["gauche"],
      "cadenas": false
    },

    "Devot": {
      "bouclier": ["violet"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 10,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-absent",
      "conditionGagneElement": ["orange"],
      "cadenas": false
    },

    "Templier": {
      "bouclier": ["violet", "rouge"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 1,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "cle",
      "conditionGagneElement": [],
      "cadenas": false
    },

    "Cardinale": {
      "bouclier": ["violet"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["violet"],
      "cadenas": false
    },

    "Fossoyeur": {
      "bouclier": ["violet", "vert"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["8"],
      "cadenas": false
    },

    "Professeur": {
      "bouclier": ["vert"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["vert"],
      "cadenas": false
    },

    "Scribe": {
      "bouclier": ["violet"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne-colonne",
      "conditionGagneElement": ["vert"],
      "cadenas": false
    },

    "Orfèvre": {
      "bouclier": ["vert", "orange"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 6,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-vertical",
      "conditionGagneElement": ["gauche"],
      "cadenas": false
    },

    "Banquière": {
      "bouclier": ["orange"],
      "lieu": "chateau",
      "cout": 7,
      "nbPoint": 1,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bourse",
      "conditionGagneElement": [],
      "cadenas": false
    },

    "Preteur sur gages": {
      "bouclier": ["orange"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "cout-cartes",
      "conditionGagneElement": ["4"],
      "cadenas": false
    },

    "Princesse": {
      "bouclier": ["bleu"],
      "lieu": "chateau",
      "cout": 3,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": true,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["bleu"],
      "cadenas": false
    },

    "Pélerin": {
      "bouclier": ["violet"],
      "lieu": "chateau",
      "cout": 6,
      "nbPoint": 4,
      "reducVillage": true,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["different"],
      "cadenas": false
    },

    "Aumonier": {
      "bouclier": ["violet"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "lieu",
      "conditionGagneElement": ["village"],
      "cadenas": false
    },

    "Usurpateur": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 5,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "lieu",
      "conditionGagneElement": ["chateau"],
      "cadenas": false
    },

    "Ecuyer": {
      "bouclier": ["rouge"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 2,
      "reducVillage": true,
      "reducChateau": true,
      "conditionGagne": "bouclier-ligne-colonne",
      "conditionGagneElement": ["orange"],
      "cadenas": false
    },

    "Agricultrice": {
      "bouclier": ["jaune", "jaune"],
      "lieu": "village",
      "cout": 5,
      "nbPoint": 7,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-horizontal",
      "conditionGagneElement": ["bas"],
      "cadenas": false
    },

    "Milicien": {
      "bouclier": ["rouge"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["rouge"],
      "cadenas": false
    },

    "Révolutionnaire": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 4,
      "nbPoint": 9,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-absent",
      "conditionGagneElement": ["bleu"],
      "cadenas": false
    },

    "Médecin": {
      "bouclier": ["vert"],
      "lieu": "village",
      "cout": 5,
      "nbPoint": 4,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "groupe-bouclier",
      "conditionGagneElement": ["vert", "jaune"],
      "cadenas": false
    },

    "Brigand": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 7,
      "nbPoint": 7,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "groupe-lieu",
      "conditionGagneElement": ["village:3"],
      "cadenas": false
    },

    "Batard": {
      "bouclier": ["jaune", "bleu"],
      "lieu": "village",
      "cout": 4,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-colonne",
      "conditionGagneElement": ["jaune"],
      "cadenas": false
    },

    "Scupltrice": {
      "bouclier": ["violet", "orange"],
      "lieu": "village",
      "cout": 3,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["7"],
      "cadenas": false
    },

    "Epicière": {
      "bouclier": ["orange"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 5,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-horizontal",
      "conditionGagneElement": ["milieu"],
      "cadenas": false
    },

    "Maitre d'armes": {
      "bouclier": ["rouge", "rouge"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["4"],
      "cadenas": false
    },

    "Curé": {
      "bouclier": ["violet"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["5"],
      "cadenas": false
    },

    "Charpentier": {
      "bouclier": ["orange"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 8,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "carte-retourne-indif",
      "conditionGagneElement": [],
      "cadenas": false
    },

    "Serrurier": {
      "bouclier": ["orange", "jaune"],
      "lieu": "village",
      "cout": 4,
      "nbPoint": 1,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "cle",
      "conditionGagneElement": [],
      "cadenas": false
    },

    "Forgeronne": {
      "bouclier": ["orange", "rouge"],
      "lieu": "village",
      "cout": 5,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-double",
      "conditionGagneElement": [],
      "cadenas": false
    },

    "Espion": {
      "bouclier": ["vert", "rouge"],
      "lieu": "village",
      "cout": 4,
      "nbPoint": 6,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-vertical",
      "conditionGagneElement": ["milieu"],
      "cadenas": false
    },

    "Fermière": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 2,
      "reducVillage": true,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["5"],
      "cadenas": false
    },

    "Horlogère": {
      "bouclier": ["orange"],
      "lieu": "village",
      "cout": 3,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["orange"],
      "cadenas": false
    },

    "Artificier": {
      "bouclier": ["rouge"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-colonne",
      "conditionGagneElement": ["rouge"],
      "cadenas": false
    },

    "Bucheron": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 5,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-vertical",
      "conditionGagneElement": ["droite"],
      "cadenas": false
    },

    "Mercenaire": {
      "bouclier": ["jaune", "rouge"],
      "lieu": "village",
      "cout": 6,
      "nbPoint": 7,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "groupe-bouclier",
      "conditionGagneElement": ["violet", "rouge", "jaune"],
      "cadenas": false
    },

    "Boulangère": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-bi",
      "conditionGagneElement": ["croix"],
      "cadenas": false
    },

    "Vigneron": {
      "bouclier": ["vert", "jaune"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-colonne",
      "conditionGagneElement": ["different"],
      "cadenas": false
    },

    "Apiculteur": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["9"],
      "cadenas": false
    },

    "Aubergiste": {
      "bouclier": ["orange"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["6"],
      "cadenas": false
    },

    "Inventeur": {
      "bouclier": ["vert", "vert"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 1,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "lieu",
      "conditionGagneElement": ["village"],
      "cadenas": false
    },

    "Philosophe": {
      "bouclier": ["vert"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 10,
      "reducVillage": false,
      "reducChateau": true,
      "conditionGagne": "bouclier-absent",
      "conditionGagneElement": ["rouge"],
      "cadenas": false
    },

    "Barbare": {
      "bouclier": ["rouge"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 10,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-absent",
      "conditionGagneElement": ["vert"],
      "cadenas": false
    },

    "Moine": {
      "bouclier": ["jaune", "violet"],
      "lieu": "village",
      "cout": 4,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne-colonne",
      "conditionGagneElement": ["jaune"],
      "cadenas": false
    },

    "Tailleuse de pierre": {
      "bouclier": ["orange"],
      "lieu": "village",
      "cout": 3,
      "nbPoint": 3,
      "reducVillage": true,
      "reducChateau": false,
      "conditionGagne": "bouclier-colonne",
      "conditionGagneElement": ["orange"],
      "cadenas": false
    },

    "Pecheur": {
      "bouclier": ["jaune", "jaune"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 4,
      "reducVillage": false,
      "reducChateau": true,
      "conditionGagne": "emplacement-bi",
      "conditionGagneElement": ["extremite"],
      "cadenas": false
    },

    "Miraculée": {
      "bouclier": ["violet", "violet"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["4"],
      "cadenas": false
    },

    "Potier": {
      "bouclier": ["orange", "orange"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["4"],
      "cadenas": false
    },

    "Voyageuse": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "cout-cartes",
      "conditionGagneElement": ["0"],
      "cadenas": false
    },

    "Sorcière": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 4,
      "nbPoint": 9,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-absent",
      "conditionGagneElement": ["violet"],
      "cadenas": false
    },

    "Armurière": {
      "bouclier": ["orange"],
      "lieu": "village",
      "cout": 3,
      "nbPoint": 3,
      "reducVillage": true,
      "reducChateau": true,
      "conditionGagne": "bouclier-ligne-colonne",
      "conditionGagneElement": ["rouge"],
      "cadenas": false
    },

    "Bourreau": {
      "bouclier": ["rouge"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 1,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "lieu",
      "conditionGagneElement": ["chateau"],
      "cadenas": false
    },

    "Bergère": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 5,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["jaune"],
      "cadenas": false
    },

    "Mendiante": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne-colonne",
      "conditionGagneElement": ["violet"],
      "cadenas": false
    },

    "Roi des gueux": {
      "bouclier": ["rouge","orange","jaune"],
      "lieu": "village",
      "cout": 5,
      "nbPoint": 12,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "carte-retourne-indif-absent",
      "conditionGagneElement": [],
      "cadenas": true
    },

    "Faussaire": {
      "bouclier": ["vert"],
      "lieu": "village",
      "cout": 4,
      "nbPoint": 7,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "check-bouclier-ligne",
      "conditionGagneElement": ["rouge"],
      "cadenas": true
    },

    "Tire-laine": {
      "bouclier": ["rouge"],
      "lieu": "village",
      "cout": 3,
      "nbPoint": 10,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "check-bourse-absent",
      "conditionGagneElement": [],
      "cadenas": true
    },

    "Prince des voleurs": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 4,
      "nbPoint": 4,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "compte-cadenas",
      "conditionGagneElement": [],
      "cadenas": true
    },

    "Voyante": {
      "bouclier": ["jaune","jaune"],
      "lieu": "village",
      "cout": 1,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "check-bouclier-colonne",
      "conditionGagneElement": ["bleu"],
      "cadenas": true
    },

    "Colporteur": {
      "bouclier": ["orange"],
      "lieu": "village",
      "cout": 7,
      "nbPoint": 1,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "somme-argent-colonne",
      "conditionGagneElement": [],
      "cadenas": true
    },

    "Flagorneur": {
      "bouclier": ["bleu"],
      "lieu": "chateau",
      "cout": 7,
      "nbPoint": 1,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "somme-argent-ligne",
      "conditionGagneElement": [],
      "cadenas": true
    },

    "Conspirateur": {
      "bouclier": ["violet"],
      "lieu": "chateau",
      "cout": 1,
      "nbPoint": 8,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "check-reduction-absente",
      "conditionGagneElement": [],
      "cadenas": true
    },

    "Dramaturge": {
      "bouclier": ["vert"],
      "lieu": "chateau",
      "cout": 3,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-simple",
      "conditionGagneElement": [],
      "cadenas": true
    },

    "La main du cardinal": {
      "bouclier": ["rouge"],
      "lieu": "chateau",
      "cout": 0,
      "nbPoint": 5,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "check-bouclier-ligne",
      "conditionGagneElement": ["violet"],
      "cadenas": true
    },

    "Imprimeuse": {
      "bouclier": ["orange"],
      "lieu": "chateau",
      "cout": 0,
      "nbPoint": 5,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "check-bouclier-colonne",
      "conditionGagneElement": ["vert"],
      "cadenas": true
    },

    "Dame au masque de fer": {
      "bouclier": ["bleu","violet","vert"],
      "lieu": "chateau",
      "cout": 8,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "carte-somme-differente",
      "conditionGagneElement": [],
      "cadenas": true
    },
  };
}
