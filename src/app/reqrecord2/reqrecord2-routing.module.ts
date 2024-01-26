import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Reqrecord2Page } from './reqrecord2.page';

const routes: Routes = [
  {
    path: '',
    component: Reqrecord2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Reqrecord2PageRoutingModule {}
