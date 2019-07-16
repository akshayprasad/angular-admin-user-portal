import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { RoleGuardService } from '../guards/role-guard.service';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: DashboardComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],

    exports: [RouterModule],
    providers: [RoleGuardService]
})

export class DashboardRoutingModule {}
