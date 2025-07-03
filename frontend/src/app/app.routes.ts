import { Routes } from '@angular/router';
import { DashboardPage } from './features/dashboard-page/dashboard-page';
import { CreatePage } from './features/create-page/create-page';
import { CoursePage } from './features/course-page/course-page';

export const routes: Routes = [
  { path: '', component: DashboardPage },
  { path: 'create', component: CreatePage },
  { path: 'course/:id', component: CoursePage },
  { path: '**', redirectTo: '' },
];
