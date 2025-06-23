import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Create } from './pages/create/create';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'create', component: Create },
  { path: '**', redirectTo: '' },
];
