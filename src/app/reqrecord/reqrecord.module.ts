import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReqrecordPageRoutingModule } from './reqrecord-routing.module';

import { ReqrecordPage } from './reqrecord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReqrecordPageRoutingModule
  ],
  declarations: [ReqrecordPage]
})
export class ReqrecordPageModule {}
