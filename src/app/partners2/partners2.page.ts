import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-partners2',
  templateUrl: './partners2.page.html',
  styleUrls: ['./partners2.page.scss'],
})
export class Partners2Page implements OnInit {

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
    private storage2: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public platform: Platform,
  ) { }

  ngOnInit() {
    this.storage.get('session_1').then(res=>{
      this.datastorage = res;
      this.name = this.datastorage.name;
      this.userid = this.datastorage.userid;
      this.loadPartnerData();
    });
  }


  async loadPartnerData() {
       
    return new Promise(resolve => {
       let body = {
         partner: "process_partner", 
       }
       
       this.accessserv.postData(body, 'partner-api2.php').subscribe((res:any) =>{
          if(res.success == true) {
            console.log(res.result);
            this.partnerdata = res.result;
            
            if(this.partnerdata == null) {
              this.caption= "No Partners Available";
            }

          } else {
            console.log("Error in loading your data");

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


  booknonpartner(id:any) {
    this.navCtrl.navigateForward('/book/' + id);
  }

  bookpartner(id:any) {
    this.navCtrl.navigateForward('/book/' + id);
  }

  biodata2(id:any) {
    this.navCtrl.navigateForward('/biodata2/' + id);
  }
}
