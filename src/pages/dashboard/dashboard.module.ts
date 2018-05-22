import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
    declarations: [
        DashboardPage,
    ],
    imports: [
        IonicPageModule.forChild(DashboardPage),
        DirectivesModule,
    ],
})
export class DashboardPageModule { }
