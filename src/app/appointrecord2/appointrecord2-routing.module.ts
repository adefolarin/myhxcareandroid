import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Appointrecord2Page } from './appointrecord2.page';

const routes: Routes = [
  {
    path: '',
    component: Appointrecord2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Appointrecord2PageRoutingModule {}
