import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Hrecord2PageRoutingModule } from './hrecord2-routing.module';

import { Hrecord2Page } from './hrecord2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Hrecord2PageRoutingModule
  ],
  declarations: [Hrecord2Page]
})
export class Hrecord2PageModule {}
