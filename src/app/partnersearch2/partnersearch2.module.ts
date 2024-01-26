import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Partnersearch2PageRoutingModule } from './partnersearch2-routing.module';

import { Partnersearch2Page } from './partnersearch2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Partnersearch2PageRoutingModule
  ],
  declarations: [Partnersearch2Page]
})
export class Partnersearch2PageModule {}
