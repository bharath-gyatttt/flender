import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { HomeComponent } from './home/home';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },

  // default path → redirect to home
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  { path: '**', redirectTo: 'home' }
];
