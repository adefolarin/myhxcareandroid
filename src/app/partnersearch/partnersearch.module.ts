import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartnersearchPageRoutingModule } from './partnersearch-routing.module';

import { PartnersearchPage } from './partnersearch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartnersearchPageRoutingModule
  ],
  declarations: [PartnersearchPage]
})
export class PartnersearchPageModule {}
