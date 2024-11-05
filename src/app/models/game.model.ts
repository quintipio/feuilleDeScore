export interface Game {
  id: number;
  name: string;
  scorePlusEleve: boolean;
  scoreLimite: number;
  mancheLimite: number;
  sheet:string;
  scoreNegatif : boolean;
  minJoueur? : number,
  maxJoueur? : number;
  canEdit : boolean;
}
