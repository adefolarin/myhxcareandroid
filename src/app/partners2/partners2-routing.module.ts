import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Partners2Page } from './partners2.page';

const routes: Routes = [
  {
    path: '',
    component: Partners2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Partners2PageRoutingModule {}
