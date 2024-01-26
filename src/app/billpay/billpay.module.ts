import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillpayPageRoutingModule } from './billpay-routing.module';

import { BillpayPage } from './billpay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillpayPageRoutingModule
  ],
  declarations: [BillpayPage]
})
export class BillpayPageModule {}
