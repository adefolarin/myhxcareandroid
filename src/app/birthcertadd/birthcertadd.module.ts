import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BirthcertaddPageRoutingModule } from './birthcertadd-routing.module';

import { BirthcertaddPage } from './birthcertadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BirthcertaddPageRoutingModule
  ],
  declarations: [BirthcertaddPage]
})
export class BirthcertaddPageModule {}
