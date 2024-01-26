import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HospitalSignupPageRoutingModule } from './hospital-signup-routing.module';

import { HospitalSignupPage } from './hospital-signup.page';

import { IonIntlTelInputModule } from 'ion-intl-tel-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonIntlTelInputModule,
    HospitalSignupPageRoutingModule
  ],
  declarations: [HospitalSignupPage]
})
export class HospitalSignupPageModule {}
