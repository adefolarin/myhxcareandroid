import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthaddPageRoutingModule } from './healthadd-routing.module';

import { HealthaddPage } from './healthadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthaddPageRoutingModule
  ],
  declarations: [HealthaddPage]
})
export class HealthaddPageModule {}
