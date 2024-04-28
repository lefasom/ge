import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/list/list.routes').then(m => m.LIST_ROUTES),
        pathMatch: 'full'

    },
    {
        path: 'register',
        loadChildren: () => import('./features/register/register.routes').then(m => m.REGISTER_ROUTES),
    },
    {
        path: 'login',
        loadChildren: () => import('./features/login/login.routes').then(m => m.LOGIN_ROUTES),
    },
   
];