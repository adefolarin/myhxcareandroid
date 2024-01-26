import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeepagePageRoutingModule } from './feepage-routing.module';

import { FeepagePage } from './feepage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeepagePageRoutingModule
  ],
  declarations: [FeepagePage]
})
export class FeepagePageModule {}
