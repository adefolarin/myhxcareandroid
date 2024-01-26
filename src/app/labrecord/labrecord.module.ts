import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabrecordPageRoutingModule } from './labrecord-routing.module';

import { LabrecordPage } from './labrecord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LabrecordPageRoutingModule
  ],
  declarations: [LabrecordPage]
})
export class LabrecordPageModule {}
