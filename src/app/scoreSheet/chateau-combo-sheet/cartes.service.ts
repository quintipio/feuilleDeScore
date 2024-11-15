import { Injectable } from '@angular/core';

export interface CarteChateauCombo {
  bouclier: string[],
  cout: number,
  nbPoint: number,
  reducVillage: boolean,
  reducChateau: boolean,
  conditionGagne: string,
  conditionGagneElement: string[],
}



@Injectable({
  providedIn: 'root',
})
export class CarteService {
  private cartesJson = {
    "Bouffon": {
      "bouclier": ["bleu"],
      "lieu": "chateau",
      "cout": 3,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne-colonne",
      "conditionGagneElement": ["bleu"]
    },

    "Baron": {
      "bouclier": ["bleu"],
      "lieu": "chateau",
      "cout": 3,
      "nbPoint": 10,
      "reducVillage": true,
      "reducChateau": true,
      "conditionGagne": "bouclier-absent",
      "conditionGagneElement": ["jaune"]
    },

    "Garde royal": {
      "bouclier": ["bleu", "rouge"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-colonne",
      "conditionGagneElement": ["bleu"]
    },

    "Mécène": {
      "bouclier": ["vert"],
      "lieu": "chateau",
      "cout": 7,
      "nbPoint": 5,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "cout-cartes-plus",
      "conditionGagneElement": ["5"]
    },

    "Souffleur de verre": {
      "bouclier": ["orange"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 4,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "groupe-bouclier",
      "conditionGagneElement": ["violet", "orange"]
    },

    "Nonne": {
      "bouclier": ["violet"],
      "lieu": "chateau",
      "cout": 3,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-colonne",
      "conditionGagneElement": ["violet"]
    },

    "Juge": {
      "bouclier": ["vert"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "groupe-lieu",
      "conditionGagneElement": ["village", "chateau"]
    },

    "Intendant": {
      "bouclier": ["bleu"],
      "lieu": "chateau",
      "cout": 0,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["3"]
    },

    "Son altesse": {
      "bouclier": ["bleu", "violet"],
      "lieu": "chateau",
      "cout": 6,
      "nbPoint": 4,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-colonne",
      "conditionGagneElement": ["bleu"]
    },

    "Mère supérieure": {
      "bouclier": ["violet", "violet"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 5,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-horizontal",
      "conditionGagneElement": ["haut"]
    },

    "Sa sainteté": {
      "bouclier": ["violet"],
      "lieu": "chateau",
      "cout": 7,
      "nbPoint": 6,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-different-absent",
      "conditionGagneElement": []
    },

    "Capitaine": {
      "bouclier": ["rouge", "rouge"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 8,
      "reducVillage": true,
      "reducChateau": false,
      "conditionGagne": "emplacement-vertical",
      "conditionGagneElement": ["droite"]
    },

    "Apothicaire": {
      "bouclier": ["vert"],
      "lieu": "chateau",
      "cout": 3,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": true,
      "conditionGagne": "bouclier-colonne",
      "conditionGagneElement": ["vert"]
    },

    "Alchimiste": {
      "bouclier": ["vert"],
      "lieu": "chateau",
      "cout": 6,
      "nbPoint": 4,
      "reducVillage": true,
      "reducChateau": true,
      "conditionGagne": "reduc",
      "conditionGagneElement": []
    },

    "Prince": {
      "bouclier": ["bleu"],
      "lieu": "chateau",
      "cout": 6,
      "nbPoint": 4,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["bleu"]
    },

    "Doyenne": {
      "bouclier": ["bleu", "bleu"],
      "lieu": "chateau",
      "cout": 3,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["5"]
    },

    "Chanceliere": {
      "bouclier": ["bleu", "verre"],
      "lieu": "chateau",
      "cout": 6,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "lieu",
      "conditionGagneElement": ["chateau"]
    },

    "Architecte": {
      "bouclier": ["vert"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 2,
      "reducVillage": true,
      "reducChateau": false,
      "conditionGagne": "bouclier-different",
      "conditionGagneElement": []
    },

    "Maitre de guilde": {
      "bouclier": ["orange", "orange"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 5,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-horizontal",
      "conditionGagneElement": ["bas"]
    },

    "Veilleur": {
      "bouclier": ["rouge"],
      "lieu": "chateau",
      "cout": 6,
      "nbPoint": 4,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-different-colonne",
      "conditionGagneElement": []
    },

    "Chevaleresse": {
      "bouclier": ["rouge"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne-colonne",
      "conditionGagneElement": ["bleu"]
    },

    "Générale": {
      "bouclier": ["rouge"],
      "lieu": "chateau",
      "cout": 7,
      "nbPoint": 6,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "groupe-bouclier",
      "conditionGagneElement": ["identique"]
    },

    "Chatelaine": {
      "bouclier": ["bleu", "orange"],
      "lieu": "chateau",
      "cout": 2,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": true,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["different"]
    },

    "Duchesse": {
      "bouclier": ["bleu", "bleu"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 8,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-horizontal",
      "conditionGagneElement": ["haut"]
    },

    "Sa majesté la reine": {
      "bouclier": ["bleu"],
      "lieu": "chateau",
      "cout": 7,
      "nbPoint": 10,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "groupe-bouclier",
      "conditionGagneElement": ["bleu", "vert", "orange"]
    },

    "Officier": {
      "bouclier": ["rouge"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 4,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "groupe-bouclier",
      "conditionGagneElement": ["bleu", "rouge"]
    },

    "Astronome": {
      "bouclier": ["vert", "vert"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 8,
      "reducVillage": false,
      "reducChateau": true,
      "conditionGagne": "emplacement-vertical",
      "conditionGagneElement": ["gauche"]
    },

    "Devot": {
      "bouclier": ["violet"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 10,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-absent",
      "conditionGagneElement": ["orange"]
    },

    "Templier": {
      "bouclier": ["violet", "rouge"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 1,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "cle",
      "conditionGagneElement": []
    },

    "Cardinale": {
      "bouclier": ["violet"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["violet"]
    },

    "Fossoyeur": {
      "bouclier": ["violet", "vert"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["8"]
    },

    "Professeur": {
      "bouclier": ["vert"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["vert"]
    },

    "Scribe": {
      "bouclier": ["violet"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne-colonne",
      "conditionGagneElement": ["vert"]
    },

    "Orfèvre": {
      "bouclier": ["vert", "orange"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 6,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-vertical",
      "conditionGagneElement": ["gauche"]
    },

    "Banquière": {
      "bouclier": ["orange"],
      "lieu": "chateau",
      "cout": 7,
      "nbPoint": 1,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bourse",
      "conditionGagneElement": []
    },

    "Preteur sur gages": {
      "bouclier": ["orange"],
      "lieu": "chateau",
      "cout": 4,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "cout-cartes",
      "conditionGagneElement": ["4"]
    },

    "Princesse": {
      "bouclier": ["bleu"],
      "lieu": "chateau",
      "cout": 3,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": true,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["bleu"]
    },

    "Pélerin": {
      "bouclier": ["violet"],
      "lieu": "chateau",
      "cout": 6,
      "nbPoint": 4,
      "reducVillage": true,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["different"]
    },

    "Aumonier": {
      "bouclier": ["violet"],
      "lieu": "chateau",
      "cout": 5,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "lieu",
      "conditionGagneElement": ["village"]
    },

    "Usurpateur": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 5,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "lieu",
      "conditionGagneElement": ["chateau"]
    },

    "Ecuyer": {
      "bouclier": ["rouge"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 2,
      "reducVillage": true,
      "reducChateau": true,
      "conditionGagne": "bouclier-ligne-colonne",
      "conditionGagneElement": ["orange"]
    },

    "Agricultrice": {
      "bouclier": ["jaune", "jaune"],
      "lieu": "village",
      "cout": 5,
      "nbPoint": 7,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-horizontal",
      "conditionGagneElement": ["bas"]
    },

    "Milicien": {
      "bouclier": ["rouge"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["rouge"]
    },

    "Révolutionnaire": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 4,
      "nbPoint": 9,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-absent",
      "conditionGagneElement": ["bleu"]
    },

    "Médecin": {
      "bouclier": ["vert"],
      "lieu": "village",
      "cout": 5,
      "nbPoint": 4,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "groupe-bouclier",
      "conditionGagneElement": ["vert", "jaune"]
    },

    "Brigand": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 7,
      "nbPoint": 7,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "groupe-lieu",
      "conditionGagneElement": ["village", "village", "village"]
    },

    "Batard": {
      "bouclier": ["jaune", "bleu"],
      "lieu": "village",
      "cout": 4,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-colonne",
      "conditionGagneElement": ["jaune"]
    },

    "Scupltrice": {
      "bouclier": ["violet", "orange"],
      "lieu": "village",
      "cout": 3,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["7"]
    },

    "Epicière": {
      "bouclier": ["orange"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 5,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-horizontal",
      "conditionGagneElement": ["milieu"]
    },

    "Maitre d'armes": {
      "bouclier": ["rouge", "rouge"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["4"]
    },

    "Curé": {
      "bouclier": ["violet"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["5"]
    },

    "Charpentier": {
      "bouclier": ["orange"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 8,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "carte-retourne",
      "conditionGagneElement": ["1-village|chateau"]
    },

    "Serrurier": {
      "bouclier": ["orange", "jaune"],
      "lieu": "village",
      "cout": 4,
      "nbPoint": 1,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "cle",
      "conditionGagneElement": []
    },

    "Forgeronne": {
      "bouclier": ["orange", "rouge"],
      "lieu": "village",
      "cout": 5,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-double",
      "conditionGagneElement": []
    },

    "Espion": {
      "bouclier": ["vert", "rouge"],
      "lieu": "village",
      "cout": 4,
      "nbPoint": 6,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-vertical",
      "conditionGagneElement": ["milieu"]
    },

    "Fermière": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 2,
      "reducVillage": true,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["5"]
    },

    "Horlogère": {
      "bouclier": ["orange"],
      "lieu": "village",
      "cout": 3,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["orange"]
    },

    "Artificier": {
      "bouclier": ["rouge"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-colonne",
      "conditionGagneElement": ["rouge"]
    },

    "Bucheron": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 5,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-vertical",
      "conditionGagneElement": ["droite"]
    },

    "Mercenaire": {
      "bouclier": ["jaune", "rouge"],
      "lieu": "village",
      "cout": 6,
      "nbPoint": 7,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "groupe-bouclier",
      "conditionGagneElement": ["violet", "rouge", "jaune"]
    },

    "Boulangère": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "emplacement-bi",
      "conditionGagneElement": ["croix"]
    },

    "Vigneron": {
      "bouclier": ["vert", "jaune"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-different-colonne",
      "conditionGagneElement": []
    },

    "Apiculteur": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["9"]
    },

    "Aubergiste": {
      "bouclier": ["orange"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["6"]
    },

    "Inventeur": {
      "bouclier": ["vert", "vert"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 1,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "lieu",
      "conditionGagneElement": ["village"]
    },

    "Philosophe": {
      "bouclier": ["vert"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 10,
      "reducVillage": false,
      "reducChateau": true,
      "conditionGagne": "bouclier-absent",
      "conditionGagneElement": ["rouge"]
    },

    "Barbare": {
      "bouclier": ["rouge"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 10,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-absent",
      "conditionGagneElement": ["vert"]
    },

    "Moine": {
      "bouclier": ["jaune", "violet"],
      "lieu": "village",
      "cout": 4,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne-colonne",
      "conditionGagneElement": ["jaune"]
    },

    "Tailleuse de pierre": {
      "bouclier": ["orange"],
      "lieu": "village",
      "cout": 3,
      "nbPoint": 3,
      "reducVillage": true,
      "reducChateau": false,
      "conditionGagne": "bouclier-colonne",
      "conditionGagneElement": ["orange"]
    },

    "Pecheur": {
      "bouclier": ["jaune", "jaune"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 4,
      "reducVillage": false,
      "reducChateau": true,
      "conditionGagne": "emplacement-bi",
      "conditionGagneElement": ["extremite"]
    },

    "Miraculée": {
      "bouclier": ["violet", "violet"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["4"]
    },

    "Potier": {
      "bouclier": ["orange", "orange"],
      "lieu": "village",
      "cout": 2,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "piece-bourse",
      "conditionGagneElement": ["4"]
    },

    "Voyageuse": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "cout-cartes",
      "conditionGagneElement": ["0"]
    },

    "Sorcière": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 4,
      "nbPoint": 9,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-absent",
      "conditionGagneElement": ["violet"]
    },

    "Armurière": {
      "bouclier": ["orange"],
      "lieu": "village",
      "cout": 3,
      "nbPoint": 3,
      "reducVillage": true,
      "reducChateau": true,
      "conditionGagne": "bouclier-ligne-colonne",
      "conditionGagneElement": ["rouge"]
    },

    "Bourreau": {
      "bouclier": ["rouge"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 1,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "lieu",
      "conditionGagneElement": ["chateau"]
    },

    "Bergère": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 5,
      "nbPoint": 3,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne",
      "conditionGagneElement": ["jaune"]
    },

    "Mendiante": {
      "bouclier": ["jaune"],
      "lieu": "village",
      "cout": 0,
      "nbPoint": 2,
      "reducVillage": false,
      "reducChateau": false,
      "conditionGagne": "bouclier-ligne-colonne",
      "conditionGagneElement": ["violet"]
    }
  };

  loadCartes(): { [key: string]: CarteChateauCombo } {
    return this.cartesJson as { [key: string]: CarteChateauCombo };
  }
}
