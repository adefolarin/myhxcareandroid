import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthrecordPageRoutingModule } from './healthrecord-routing.module';

import { HealthrecordPage } from './healthrecord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthrecordPageRoutingModule
  ],
  declarations: [HealthrecordPage]
})
export class HealthrecordPageModule {}
