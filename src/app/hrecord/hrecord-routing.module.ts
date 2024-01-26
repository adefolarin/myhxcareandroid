import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HrecordPage } from './hrecord.page';

const routes: Routes = [
  {
    path: '',
    component: HrecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrecordPageRoutingModule {}
