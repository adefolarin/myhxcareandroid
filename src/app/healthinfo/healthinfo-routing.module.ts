import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthinfoPage } from './healthinfo.page';

const routes: Routes = [
  {
    path: '',
    component: HealthinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthinfoPageRoutingModule {}
