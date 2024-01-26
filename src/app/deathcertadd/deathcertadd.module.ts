import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeathcertaddPageRoutingModule } from './deathcertadd-routing.module';

import { DeathcertaddPage } from './deathcertadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeathcertaddPageRoutingModule
  ],
  declarations: [DeathcertaddPage]
})
export class DeathcertaddPageModule {}
