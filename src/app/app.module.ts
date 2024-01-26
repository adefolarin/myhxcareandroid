import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { IonicStorageModule } from '@ionic/storage';

import { ServiceService } from './services/service.service';

//import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HomePage } from './home/home.page';
import { CommonModule } from '@angular/common';


//import { Network } from '@ionic-native/network/ngx';

//import { Push } from '@ionic-native/push/ngx';

//import { FCM } from '@ionic-native/fcm/ngx';

//import { PayPal } from '@ionic-native/paypal/ngx';

import { IonIntlTelInputModule } from 'ion-intl-tel-input';

import { AngularEditorModule } from '@kolkov/angular-editor';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
   imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonIntlTelInputModule,
    AngularEditorModule,
	  IonicModule.forRoot(), 
      // PaymentPageModule,   
      AppRoutingModule,
      IonicStorageModule.forRoot(),
      HttpClientModule,
      TranslateModule,      
      TranslateModule.forRoot({
        loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    //StatusBar,
    //SplashScreen,
    //InAppBrowser,
    ServiceService,
    HomePage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
