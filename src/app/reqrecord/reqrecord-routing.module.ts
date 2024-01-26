import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReqrecordPage } from './reqrecord.page';

const routes: Routes = [
  {
    path: '',
    component: ReqrecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReqrecordPageRoutingModule {}
