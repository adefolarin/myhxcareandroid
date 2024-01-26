import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeathcertPageRoutingModule } from './deathcert-routing.module';

import { DeathcertPage } from './deathcert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeathcertPageRoutingModule
  ],
  declarations: [DeathcertPage]
})
export class DeathcertPageModule {}
