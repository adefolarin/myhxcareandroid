import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthaddPage } from './healthadd.page';

const routes: Routes = [
  {
    path: '',
    component: HealthaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthaddPageRoutingModule {}
