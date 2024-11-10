import { Routes } from '@angular/router';
import { startGuard } from './guards/start.guard';

export const routes: Routes = [
  {
    path: 'time',
    loadComponent: () => import('./select-time/select-time.component').then((m) => m.SelectTimeComponent),
  },
  {
    path: 'timer',
    canActivate: [startGuard],
    loadComponent: () => import('./timer/timer.component').then((m) => m.TimerComponent),
  },
  {
    path: '',
    redirectTo: 'time',
    pathMatch: 'full',
  },
];
