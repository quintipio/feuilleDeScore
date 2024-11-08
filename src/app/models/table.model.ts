import { Game } from "./game.model";
import { RoundRow } from "./sheet";
import { User } from "./user.model";

export interface Table {
  id: number;
  users: User[],
  game: Game | undefined,
  round:RoundRow[]
  specificData: string;
}

export function isTable(object: any): object is Table {
  return (
    typeof object === 'object' &&
    object !== null &&
    'users' in object &&
    'game' in object &&
    'round' in object &&
    'specificData' in object
  )
}
