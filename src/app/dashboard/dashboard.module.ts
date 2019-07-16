import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { EditUserComponent } from './edit-user/edit-user.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
    declarations: [DashboardComponent, EditUserComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        AngularFontAwesomeModule,
        DashboardRoutingModule,
        TranslateModule
    ],
    exports: []
})

export class DashboardModule {}
