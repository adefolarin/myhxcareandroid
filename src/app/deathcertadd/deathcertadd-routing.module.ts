import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeathcertaddPage } from './deathcertadd.page';

const routes: Routes = [
  {
    path: '',
    component: DeathcertaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeathcertaddPageRoutingModule {}
