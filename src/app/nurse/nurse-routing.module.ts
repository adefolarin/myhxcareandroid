import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NursePage } from './nurse.page';

const routes: Routes = [
  {
    path: '',
    component: NursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NursePageRoutingModule {}
