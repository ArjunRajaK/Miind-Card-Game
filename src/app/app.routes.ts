import { Routes } from '@angular/router';
import { GridComponent } from './components/grid/grid.component';
import { ResultComponent } from './components/result/result.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'grid',
    component: GridComponent,
  },
  {
    path: 'result',
    component: ResultComponent,
  },
];
