import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangefeePageRoutingModule } from './changefee-routing.module';

import { ChangefeePage } from './changefee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangefeePageRoutingModule
  ],
  declarations: [ChangefeePage]
})
export class ChangefeePageModule {}
