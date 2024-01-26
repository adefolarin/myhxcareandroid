import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Hrecord2Page } from './hrecord2.page';

const routes: Routes = [
  {
    path: '',
    component: Hrecord2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Hrecord2PageRoutingModule {}
