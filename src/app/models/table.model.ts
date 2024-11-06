import { Game } from "./game.model";
import { User } from "./user.model";

export interface Table {
  id: number;
  users: User[],
  game: Game | undefined
}

export function isTable(object: any): object is Table {
  return (
    typeof object === 'object' &&
    object !== null &&
    'users' in object &&
    'game' in object
  )
}
