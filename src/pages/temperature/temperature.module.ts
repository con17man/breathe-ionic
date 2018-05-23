import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemperaturePage } from './temperature';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TemperaturePage,
  ],
  imports: [
    IonicPageModule.forChild(TemperaturePage),
    DirectivesModule
  ],
})
export class TemperaturePageModule {}
