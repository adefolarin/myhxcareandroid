import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthinfoPageRoutingModule } from './healthinfo-routing.module';

import { HealthinfoPage } from './healthinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthinfoPageRoutingModule
  ],
  declarations: [HealthinfoPage]
})
export class HealthinfoPageModule {}
