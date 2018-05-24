import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SensorPage } from './sensor';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    SensorPage,
  ],
  imports: [
    IonicPageModule.forChild(SensorPage),
    DirectivesModule
  ],
})
export class SensorPageModule {}
