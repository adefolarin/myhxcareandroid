import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeathcertPage } from './deathcert.page';

const routes: Routes = [
  {
    path: '',
    component: DeathcertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeathcertPageRoutingModule {}
