import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhysicianSignupPageRoutingModule } from './physician-signup-routing.module';

import { PhysicianSignupPage } from './physician-signup.page';

import { IonIntlTelInputModule } from 'ion-intl-tel-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonIntlTelInputModule,
    PhysicianSignupPageRoutingModule
  ],
  declarations: [PhysicianSignupPage]
})
export class PhysicianSignupPageModule {}
