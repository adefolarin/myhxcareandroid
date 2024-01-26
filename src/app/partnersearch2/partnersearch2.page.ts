import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-partnersearch2',
  templateUrl: './partnersearch2.page.html',
  styleUrls: ['./partnersearch2.page.scss'],
})
export class Partnersearch2Page implements OnInit {

  id:any;

  name: string = "";
  userid: any;
  datastorage: any;
  status: any;

  caption: any;

  partnerdata: any;

  searchvalue: any;

  constructor(private router: Router, 
    private navCtrl: NavController,
    private accessserv: ServiceService,
    private storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public platform: Platform,
    private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.loadPartnerData(this.id);
  }


  async loadPartnerData(search) {
       
    return new Promise(resolve => {
       let body = {
         searchdata: "process_searchdata", 
         search: search
       }
       
       this.accessserv.postData(body, 'search-api2.php').subscribe((res:any) =>{
          if(res.success == true) {
            console.log(res.result);
            this.partnerdata = res.result;
            
            if(this.partnerdata == null) {
              this.caption= "No Partners Available";
              console.log(this.caption);
            }

          } else {
            console.log("Error in loading data");

          }
       },(err)=>{
           console.log(err);
       });

    });

 
   }


   async searchList(event)  {
    this.searchvalue = event.target.value;
    this.navCtrl.navigateForward('/partnersearch2/' + this.searchvalue);
  }


  bookpartner(id:any) {
    this.navCtrl.navigateForward('/book/' + id);
  }

  biodata2(id:any) {
    this.navCtrl.navigateForward('/biodata2/' + id);
  }

}
