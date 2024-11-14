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
  { "id": 8,"uuid":"aa00ece5-d4e9-456e-be27-a96395079139", "name": "Qwirlkle", "scorePlusEleve": true, "scoreLimite": 0, "mancheLimite": 0, "scoreNegatif": false, "canEdit": false, "sheet": "qwirkle", "specificConf":"" }
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
