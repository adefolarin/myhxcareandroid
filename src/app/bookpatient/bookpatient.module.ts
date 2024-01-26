import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookpatientPageRoutingModule } from './bookpatient-routing.module';

import { BookpatientPage } from './bookpatient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookpatientPageRoutingModule
  ],
  declarations: [BookpatientPage]
})
export class BookpatientPageModule {}
