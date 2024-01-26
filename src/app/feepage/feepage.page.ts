import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import {DomSanitizer,SafeResourceUrl} from "@angular/platform-browser";
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

@Component({
  selector: 'app-feepage',
  templateUrl: './feepage.page.html',
  styleUrls: ['./feepage.page.scss'],
})
export class FeepagePage implements OnInit {

  id: any;
  name: string = "";
  userid: any;
  datastorage: any;
  status: any;
  partnerid: any;
  usertype: any;

  patientid: any;
  amount: any;
  currency: any;
  request: any;

  partnerdata: any;

  siteurl:SafeResourceUrl;

  constructor(
  	private accessserv: ServiceService,
    public platform: Platform,
    private DomSanitizer:DomSanitizer,
    private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.partnerid = this.activatedroute.snapshot.paramMap.get('partnerid');
    this.patientid = this.activatedroute.snapshot.paramMap.get('patientid');
    this.name = this.activatedroute.snapshot.paramMap.get('name');
    this.amount = this.activatedroute.snapshot.paramMap.get('amount');
    this.currency = this.activatedroute.snapshot.paramMap.get('currency');
    this.request = this.activatedroute.snapshot.paramMap.get('request');
    this.feepage();
  }


  feepage() {
    /*this.siteurl  = this.DomSanitizer.bypassSecurityTrustResourceUrl(this.accessserv.server2+'hospital/payfee.php?userid='+this.patientid+'&partnerid='+this.partnerid+'&name='+this.name+'&amount='+this.amount+'&currency='+this.currency+'&request='+this.request); */

    /*this.platform.ready().then(() => {
      let browser = this.iab.create(this.accessserv.server2+'hospital/payfee.php?userid='+this.patientid+'&partnerid='+this.partnerid+'&name='+this.name+'&amount='+this.amount+'&currency='+this.currency+'&request='+this.request);
    });*/
  }

}
