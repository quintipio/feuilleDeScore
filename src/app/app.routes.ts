import { Routes } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { TableComponent } from './table/table.component';
import { GenericSheetComponent } from './scoreSheet/generic-sheet/generic-sheet.component';
import { MilleSabordSheetComponent } from './scoreSheet/mille-sabord-sheet/mille-sabord-sheet.component';
import { SeaSaltAndPaperSheetComponent } from './scoreSheet/sea-salt-and-paper-sheet/sea-salt-and-paper-sheet.component';
import { SkullKingSheetComponent } from './scoreSheet/skull-king-sheet/skull-king-sheet.component';
import { QwirkleSheetComponent } from './scoreSheet/qwirkle-sheet/qwirkle-sheet.component';
import { PixiesSheetComponent } from './scoreSheet/pixies-sheet/pixies-sheet.component';
import { ChateauComboSheetComponent } from './scoreSheet/chateau-combo-sheet/chateau-combo-sheet.component';
import { DorfromantikSheetComponent } from './scoreSheet/dorfromantik-sheet/dorfromantik-sheet.component';
import { YamsSheetComponent } from './scoreSheet/yams-sheet/yams-sheet.component';
import { DarwinSheetComponent } from './scoreSheet/darwin-sheet/darwin-sheet.component';
import { HistoricComponent } from './table/historic/historic.component';
import { CourtisansSheetComponent  } from './scoreSheet/courtisans-sheet/courtisans-sheet.component';

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
    path: 'tables/historic',
    title: 'Historique',
    component: HistoricComponent,
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
  {
    path: 'sheet/pixies',
    title: 'Pixies',
    component: PixiesSheetComponent,
  },
  {
    path: 'sheet/chateauCombo',
    title: 'ChateauCombo',
    component: ChateauComboSheetComponent,
  },
  {
    path: 'sheet/dorfromantik',
    title: 'Dorf romantik',
    component: DorfromantikSheetComponent,
  },
  {
    path: 'sheet/yams',
    title: 'Yathzee',
    component: YamsSheetComponent,
  },
  {
    path: 'sheet/darwin',
    title: 'Sur les traces de Darwin',
    component: DarwinSheetComponent,
  },
  {
    path: 'sheet/courtisans',
    title: 'Courtisans',
    component: CourtisansSheetComponent,
  },
];
