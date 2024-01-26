import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthupdatePageRoutingModule } from './healthupdate-routing.module';

import { HealthupdatePage } from './healthupdate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthupdatePageRoutingModule
  ],
  declarations: [HealthupdatePage]
})
export class HealthupdatePageModule {}
