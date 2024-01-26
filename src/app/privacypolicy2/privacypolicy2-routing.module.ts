import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Privacypolicy2Page } from './privacypolicy2.page';

const routes: Routes = [
  {
    path: '',
    component: Privacypolicy2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Privacypolicy2PageRoutingModule {}
