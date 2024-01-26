import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdfwebPageRoutingModule } from './pdfweb-routing.module';

import { PdfwebPage } from './pdfweb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfwebPageRoutingModule
  ],
  declarations: [PdfwebPage]
})
export class PdfwebPageModule {}
