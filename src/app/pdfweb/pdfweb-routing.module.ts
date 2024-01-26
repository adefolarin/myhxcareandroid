import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PdfwebPage } from './pdfweb.page';

const routes: Routes = [
  {
    path: '',
    component: PdfwebPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdfwebPageRoutingModule {}
