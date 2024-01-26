import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasscodePage } from './passcode.page';

const routes: Routes = [
  {
    path: '',
    component: PasscodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasscodePageRoutingModule {}
