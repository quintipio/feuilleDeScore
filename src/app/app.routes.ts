import { Routes } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { TableComponent } from './table/table.component';
import { GenericSheetComponent } from './scoreSheet/generic-sheet/generic-sheet.component';
import { MilleSabordSheetComponent } from './scoreSheet/mille-sabord-sheet/mille-sabord-sheet.component';
import { SeaSaltAndPaperSheetComponent } from './scoreSheet/sea-salt-and-paper-sheet/sea-salt-and-paper-sheet.component';
import { SkullKingSheetComponent } from './scoreSheet/skull-king-sheet/skull-king-sheet.component';
import { QwirkleSheetComponent } from './scoreSheet/qwirkle-sheet/qwirkle-sheet.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tables', pathMatch: 'full' },
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
  {
    path: 'sheet/qwirkle',
    title: 'Qwirkle',
    component: QwirkleSheetComponent,
  },
  {
    path: 'sheet/skullKing',
    title: 'Skull King',
    component: SkullKingSheetComponent,
  },
];
