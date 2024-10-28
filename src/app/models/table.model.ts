import { Game } from "./game.model";

export interface Table {
  id: number;
  usersId: number[],
  users?: [],
  game: Game | undefined
}
