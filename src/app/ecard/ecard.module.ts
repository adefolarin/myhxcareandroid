import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcardPageRoutingModule } from './ecard-routing.module';

import { EcardPage } from './ecard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EcardPageRoutingModule
  ],
  declarations: [EcardPage]
})
export class EcardPageModule {}
