import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabrecordPage } from './labrecord.page';

const routes: Routes = [
  {
    path: '',
    component: LabrecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabrecordPageRoutingModule {}
