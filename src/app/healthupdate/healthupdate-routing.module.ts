import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthupdatePage } from './healthupdate.page';

const routes: Routes = [
  {
    path: '',
    component: HealthupdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthupdatePageRoutingModule {}
