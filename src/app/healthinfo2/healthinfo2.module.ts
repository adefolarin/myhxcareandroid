import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Healthinfo2PageRoutingModule } from './healthinfo2-routing.module';

import { Healthinfo2Page } from './healthinfo2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Healthinfo2PageRoutingModule
  ],
  declarations: [Healthinfo2Page]
})
export class Healthinfo2PageModule {}
