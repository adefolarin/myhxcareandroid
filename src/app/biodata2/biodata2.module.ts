import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Biodata2PageRoutingModule } from './biodata2-routing.module';

import { Biodata2Page } from './biodata2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Biodata2PageRoutingModule
  ],
  declarations: [Biodata2Page]
})
export class Biodata2PageModule {}
