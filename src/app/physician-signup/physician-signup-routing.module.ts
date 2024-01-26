import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysicianSignupPage } from './physician-signup.page';

const routes: Routes = [
  {
    path: '',
    component: PhysicianSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicianSignupPageRoutingModule {}
