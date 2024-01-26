import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Healthinfo2Page } from './healthinfo2.page';

const routes: Routes = [
  {
    path: '',
    component: Healthinfo2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Healthinfo2PageRoutingModule {}
