import { Routes } from '@angular/router';
import { DashboardPage } from './features/dashboard/dashboard';
import { CreatePage } from './features/create/create';

export const routes: Routes = [
  { path: '', component: DashboardPage },
  { path: 'create', component: CreatePage },
  { path: '**', redirectTo: '' },
];
