import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangefeePage } from './changefee.page';

const routes: Routes = [
  {
    path: '',
    component: ChangefeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangefeePageRoutingModule {}
