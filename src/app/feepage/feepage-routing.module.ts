import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeepagePage } from './feepage.page';

const routes: Routes = [
  {
    path: '',
    component: FeepagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeepagePageRoutingModule {}
