import { User } from "./user.model";

export type UserColumn = {
  position: number;
  user: User;
}

export type CountRoundRow = {
  user: UserColumn
  value: number;
}

export type RoundRow = {
  row: number;
  points: CountRoundRow[];
}
