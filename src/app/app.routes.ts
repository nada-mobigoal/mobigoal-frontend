import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'practice', loadComponent: () => import('./pages/practice/practice').then(m => m.Practice) },
  { path: 'results', loadComponent: () => import('./pages/results/results').then(m => m.Results) },
];
