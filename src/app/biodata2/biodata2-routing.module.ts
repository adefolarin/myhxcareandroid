import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Biodata2Page } from './biodata2.page';

const routes: Routes = [
  {
    path: '',
    component: Biodata2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Biodata2PageRoutingModule {}
