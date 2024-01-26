import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';
import {DomSanitizer,SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-privacypolicy2',
  templateUrl: './privacypolicy2.page.html',
  styleUrls: ['./privacypolicy2.page.scss'],
})
export class Privacypolicy2Page implements OnInit {

  siteurl:SafeResourceUrl;

  constructor(private router: Router, 
    private navCtrl: NavController,
  	private accessserv: ServiceService,
    private storage: Storage,
    private storage2: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public platform: Platform,
    private DomSanitizer:DomSanitizer,) { }

  ngOnInit() {
    this.website();
  }


  website() {
    this.siteurl  = this.DomSanitizer.bypassSecurityTrustResourceUrl("https://www.myhxcare.com/myhxcarehosp/ourterms.php"); 
  }

}
