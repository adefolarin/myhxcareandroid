import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientSignupPage } from './patient-signup.page';

const routes: Routes = [
  {
    path: '',
    component: PatientSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientSignupPageRoutingModule {}
