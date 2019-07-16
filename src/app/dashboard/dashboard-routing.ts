import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: DashboardComponent
    },
    {
        path: 'edit-user',
        component: EditUserComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],

    exports: [RouterModule]
})

export class DashboardRoutingModule {}
