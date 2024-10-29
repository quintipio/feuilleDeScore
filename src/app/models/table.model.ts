import { Game } from "./game.model";
import { User } from "./user.model";

export interface Table {
  id: number;
  usersId: number[],
  users?: User[],
  game: Game | undefined
}
