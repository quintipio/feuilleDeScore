export interface Game {
  id: number;
  uuid?: string;
  name: string;
  scorePlusEleve: boolean;
  scoreLimite: number;
  mancheLimite: number;
  sheet: string;
  scoreNegatif: boolean;
  minJoueur?: number,
  maxJoueur?: number;
  canEdit: boolean;
  specificConf: string;
}


export const GameExisting: Game[] = [
  { "id": 1,"uuid":"d61fc9ea-9338-4d12-825f-5290609d2ebf", "name": "Skyjo", "scorePlusEleve": false, "scoreLimite": 100, "mancheLimite": 10, "scoreNegatif": true, "canEdit": false, "sheet": "generic", "specificConf":"" },
  { "id": 2,"uuid":"09162e52-cca7-4fb5-89b4-76d85aa6c785", "name": "6 qui prend", "scorePlusEleve": false, "scoreLimite": 66, "mancheLimite": 0, "scoreNegatif": false, "canEdit": false, "sheet": "generic", "specificConf":"" },
  { "id": 3,"uuid":"8e13d735-3349-481a-9fbd-ed564ee7abc8", "name": "Hula Hoo", "scorePlusEleve": true, "scoreLimite": 77, "mancheLimite": 0, "scoreNegatif": false, "canEdit": false, "sheet": "generic", "specificConf":"" },
  { "id": 4,"uuid":"5ca55918-f6be-460a-aacc-be5fbd782060", "name": "Mille sabords", "scorePlusEleve": true, "scoreLimite": 6000, "mancheLimite": 0, "scoreNegatif": false, "canEdit": false, "sheet": "milleSabords", "specificConf":"" },
  { "id": 5,"uuid":"e21b6919-ea1a-42f1-9b3d-29a02540fc45", "name": "Sea salt and paper", "scorePlusEleve": true, "scoreLimite": 40, "mancheLimite": 0, "scoreNegatif": false, "canEdit": false, "minJoueur": 2, "maxJoueur": 4, "sheet": "seaSaltAndPaper", "specificConf":"" },
  { "id": 6,"uuid":"e822ef82-8c68-478c-b5d8-874accb3105b", "name": "Skull King", "scorePlusEleve": true, "scoreLimite": 0, "mancheLimite": 10, "scoreNegatif": true, "canEdit": false, "minJoueur": 2, "maxJoueur": 10, "sheet": "skullKing", "specificConf":"{\"rascalScore\":false,\"alwaysScore\":false,\"rascalPoing\":false,\"manche\":[2,3,1,4,5,6,7,8,9,10]}"},
  { "id": 7,"uuid":"cf402827-850b-44ff-a7ed-c757c48b7539", "name": "Odin", "scorePlusEleve": false, "scoreLimite": 15, "mancheLimite": 0, "scoreNegatif": false, "canEdit": false, "sheet": "generic", "specificConf":"" },
  { "id": 8,"uuid":"aa00ece5-d4e9-456e-be27-a96395079139", "name": "Qwirlkle", "scorePlusEleve": true, "scoreLimite": 0, "mancheLimite": 0, "scoreNegatif": false, "canEdit": false, "sheet": "qwirkle", "specificConf":"" },
  { "id": 9,"uuid":"7983f536-223e-420b-80f3-fac6a34342da", "name": "Pixies", "scorePlusEleve": true, "scoreLimite": 0, "mancheLimite": 3, "scoreNegatif": true, "canEdit": false, "sheet": "pixies", "specificConf":"" },
  { "id": 10,"uuid":"e989722b-cf42-42c9-bc4b-602e9c319726", "name": "Chateau combo", "scorePlusEleve": true, "scoreLimite": 0, "mancheLimite": 0, "scoreNegatif": false, "canEdit": false, "sheet": "chateauCombo", "specificConf":"" },
  { "id": 11,"uuid":"7f2425ce-d96b-424b-81b1-ad6b60de1f30", "name": "Dorf romantik", "scorePlusEleve": true, "scoreLimite": 0, "mancheLimite": 0, "scoreNegatif": false, "canEdit": false, "sheet": "dorfromantik", "specificConf":"" },
  { "id": 12,"uuid":"1f87c1b5-9c62-4253-8476-bc8d0e91c337", "name": "Scrabble", "scorePlusEleve": true, "scoreLimite": 0, "mancheLimite": 0, "scoreNegatif": false, "canEdit": false, "sheet": "generic", "specificConf":"" },
  { "id": 13,"uuid":"8f277ffa-ccaa-4264-be4b-73ab0b2167e8", "name": "Rami", "scorePlusEleve": true, "scoreLimite": 250, "mancheLimite": 0, "scoreNegatif": true, "canEdit": false, "sheet": "generic", "specificConf":"" },
  { "id": 14,"uuid":"988f1104-0a21-4fd5-95f3-4cebf1a08541", "name": "Belote", "scorePlusEleve": true, "scoreLimite": 1000, "mancheLimite": 0, "scoreNegatif": true, "canEdit": false, "minJoueur": 2, "maxJoueur": 4, "sheet": "generic", "specificConf":"" },
  { "id": 15,"uuid":"f69c6723-8e46-45ad-8cc2-dc15e7ef76d8", "name": "Yam's", "scorePlusEleve": true, "scoreLimite": 0, "mancheLimite": 0, "scoreNegatif": false, "canEdit": false, "sheet": "yams", "specificConf":"" }
]

export function isGame(object: any): object is Game {
  return (
    typeof object === 'object' &&
    object !== null &&
    'scorePlusEleve' in object &&
    'scoreLimite' in object &&
    'mancheLimite' in object &&
    'sheet' in object &&
    'canEdit' in object &&
    'specificConf' in object
  );
}
