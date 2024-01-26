import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BirthcertPageRoutingModule } from './birthcert-routing.module';

import { BirthcertPage } from './birthcert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BirthcertPageRoutingModule
  ],
  declarations: [BirthcertPage]
})
export class BirthcertPageModule {}
