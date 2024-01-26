import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookpatientPage } from './bookpatient.page';

const routes: Routes = [
  {
    path: '',
    component: BookpatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookpatientPageRoutingModule {}
