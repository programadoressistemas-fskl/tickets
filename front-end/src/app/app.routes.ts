import { Routes } from '@angular/router';
import { Home } from './admin/home/home';
import { Login } from './auth/login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    component: Home
  }
];
