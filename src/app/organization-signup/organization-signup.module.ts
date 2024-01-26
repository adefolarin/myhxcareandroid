import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationSignupPageRoutingModule } from './organization-signup-routing.module';

import { OrganizationSignupPage } from './organization-signup.page';

import { IonIntlTelInputModule } from 'ion-intl-tel-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonIntlTelInputModule,
    OrganizationSignupPageRoutingModule
  ],
  declarations: [OrganizationSignupPage]
})
export class OrganizationSignupPageModule {}
