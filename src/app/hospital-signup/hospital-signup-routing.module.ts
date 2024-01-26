import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HospitalSignupPage } from './hospital-signup.page';

const routes: Routes = [
  {
    path: '',
    component: HospitalSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalSignupPageRoutingModule {}
