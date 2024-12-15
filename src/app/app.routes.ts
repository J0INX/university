import { Routes } from '@angular/router';

import { AuthguardService } from '../services/authguard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./landing/landing.component').then((c) => c.LandingComponent),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },

  {
    path: 'profile',
    canActivate: [AuthguardService],
    loadComponent: () =>
      import('./profile/profile.component').then((c) => c.ProfileComponent),
  },
];
