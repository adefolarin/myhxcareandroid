import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BirthcertPage } from './birthcert.page';

const routes: Routes = [
  {
    path: '',
    component: BirthcertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BirthcertPageRoutingModule {}
