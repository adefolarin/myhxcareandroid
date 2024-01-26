import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointrecordPage } from './appointrecord.page';

const routes: Routes = [
  {
    path: '',
    component: AppointrecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointrecordPageRoutingModule {}
