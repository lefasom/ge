import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/list/list.routes').then(m => m.LIST_ROUTES),
        pathMatch: 'full'

    },
    {
        path: 'form',
        loadChildren: () => import('./features/form/form.routes').then(m => m.FORM_ROUTES),
    },
    {
        path: 'login',
        loadChildren: () => import('./features/login/login.routes').then(m => m.LOGIN_ROUTES),
    },
   
];