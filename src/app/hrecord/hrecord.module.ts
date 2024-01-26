import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HrecordPageRoutingModule } from './hrecord-routing.module';

import { HrecordPage } from './hrecord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HrecordPageRoutingModule
  ],
  declarations: [HrecordPage]
})
export class HrecordPageModule {}
