import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillpayPage } from './billpay.page';

const routes: Routes = [
  {
    path: '',
    component: BillpayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillpayPageRoutingModule {}
