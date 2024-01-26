import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Healthrecord2PageRoutingModule } from './healthrecord2-routing.module';

import { Healthrecord2Page } from './healthrecord2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Healthrecord2PageRoutingModule
  ],
  declarations: [Healthrecord2Page]
})
export class Healthrecord2PageModule {}
