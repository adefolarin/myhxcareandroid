import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartnersearchPage } from './partnersearch.page';

const routes: Routes = [
  {
    path: '',
    component: PartnersearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnersearchPageRoutingModule {}
