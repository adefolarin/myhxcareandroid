import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Healthrecord2Page } from './healthrecord2.page';

const routes: Routes = [
  {
    path: '',
    component: Healthrecord2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Healthrecord2PageRoutingModule {}
