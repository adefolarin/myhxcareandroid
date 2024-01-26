import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Partners2PageRoutingModule } from './partners2-routing.module';

import { Partners2Page } from './partners2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Partners2PageRoutingModule
  ],
  declarations: [Partners2Page]
})
export class Partners2PageModule {}
