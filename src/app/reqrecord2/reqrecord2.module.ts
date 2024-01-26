import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Reqrecord2PageRoutingModule } from './reqrecord2-routing.module';

import { Reqrecord2Page } from './reqrecord2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Reqrecord2PageRoutingModule
  ],
  declarations: [Reqrecord2Page]
})
export class Reqrecord2PageModule {}
