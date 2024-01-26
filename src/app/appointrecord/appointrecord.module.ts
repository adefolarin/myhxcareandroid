import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointrecordPageRoutingModule } from './appointrecord-routing.module';

import { AppointrecordPage } from './appointrecord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointrecordPageRoutingModule
  ],
  declarations: [AppointrecordPage]
})
export class AppointrecordPageModule {}
