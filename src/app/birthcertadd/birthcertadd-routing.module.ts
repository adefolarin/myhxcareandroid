import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BirthcertaddPage } from './birthcertadd.page';

const routes: Routes = [
  {
    path: '',
    component: BirthcertaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BirthcertaddPageRoutingModule {}
