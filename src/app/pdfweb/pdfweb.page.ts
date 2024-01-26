import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';
import {DomSanitizer,SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-pdfweb',
  templateUrl: './pdfweb.page.html',
  styleUrls: ['./pdfweb.page.scss'],
})
export class PdfwebPage implements OnInit {

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
    this.pdfweb();
  }


  pdfweb() {
    this.siteurl  = this.DomSanitizer.bypassSecurityTrustResourceUrl("http://localhost:8080/projects/myhxcare/api/pdfdata-api.php"); 
  }

}
