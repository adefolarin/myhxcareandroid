import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientSignupPageRoutingModule } from './patient-signup-routing.module';

import { PatientSignupPage } from './patient-signup.page';

import { IonIntlTelInputModule } from 'ion-intl-tel-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientSignupPageRoutingModule,
    IonIntlTelInputModule 
  ],
  declarations: [PatientSignupPage]
})
export class PatientSignupPageModule {}
