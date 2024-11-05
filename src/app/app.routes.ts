import { Routes } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { TableComponent } from './table/table.component';
import { GenericSheetComponent } from './scoreSheet/generic-sheet/generic-sheet.component';
import { MilleSabordSheetComponent } from './scoreSheet/mille-sabord-sheet/mille-sabord-sheet.component';
import { SeaSaltAndPaperSheetComponent } from './scoreSheet/sea-salt-and-paper-sheet/sea-salt-and-paper-sheet.component';

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
  {
    path: 'sheet/milleSabords',
    title: 'Mille sabords',
    component: MilleSabordSheetComponent,
  },
  {
    path: 'sheet/seaSaltAndPaper',
    title: 'Sea salt and paper',
    component: SeaSaltAndPaperSheetComponent,
  },
];
