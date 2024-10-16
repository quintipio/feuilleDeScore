import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { GamesComponent } from './games/games.component';

export const routes: Routes = [
  {
    path: 'users',
    title: 'Joueurs',
    component: UsersComponent,
  },
  {
    path: 'games',
    title: 'Jeux',
    component: GamesComponent,
  },
];
