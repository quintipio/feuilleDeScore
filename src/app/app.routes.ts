import { Routes } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { TableComponent } from './table/table.component';
import { GenericSheetComponent } from './scoreSheet/generic-sheet/generic-sheet.component';

export const routes: Routes = [
  {
    path: 'games',
    title: 'Jeux',
    component: GamesComponent,
  },
  {
    path: 'tables',
    title: 'Tables',
    component: TableComponent,
  },
  {
    path: 'sheet/generic',
    title: 'Feuille de score',
    component: GenericSheetComponent,
  },
];
