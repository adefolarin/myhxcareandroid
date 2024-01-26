import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Partnersearch2Page } from './partnersearch2.page';

const routes: Routes = [
  {
    path: '',
    component: Partnersearch2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Partnersearch2PageRoutingModule {}
