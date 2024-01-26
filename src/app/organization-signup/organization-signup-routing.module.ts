import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationSignupPage } from './organization-signup.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationSignupPageRoutingModule {}
