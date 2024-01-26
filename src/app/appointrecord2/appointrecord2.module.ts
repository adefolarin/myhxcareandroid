import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Appointrecord2PageRoutingModule } from './appointrecord2-routing.module';

import { Appointrecord2Page } from './appointrecord2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Appointrecord2PageRoutingModule
  ],
  declarations: [Appointrecord2Page]
})
export class Appointrecord2PageModule {}
