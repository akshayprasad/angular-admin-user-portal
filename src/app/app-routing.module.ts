import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './shared';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './core/shared/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    },
    {
        path: '404',
        component: NotFoundComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true})
    ],

    exports: [RouterModule]
})

export class AppRoutingModule {}
