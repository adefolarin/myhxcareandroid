import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Privacypolicy2PageRoutingModule } from './privacypolicy2-routing.module';

import { Privacypolicy2Page } from './privacypolicy2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Privacypolicy2PageRoutingModule
  ],
  declarations: [Privacypolicy2Page]
})
export class Privacypolicy2PageModule {}
