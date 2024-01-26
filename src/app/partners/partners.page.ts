import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.page.html',
  styleUrls: ['./partners.page.scss'],
})
export class PartnersPage implements OnInit {

  name: string = "";
  userid: any;
  datastorage: any;
  status: any;

  caption: any;

  partnerdata: any;

  searchvalue: any;

  area: any;

  onlinestatus: any;


  constructor(private router: Router, 
    private navCtrl: NavController,
  	private accessserv: ServiceService,
    private storage: Storage,
    private storage2: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public platform: Platform,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.storage.get('session_1').then(res=>{
      this.datastorage = res;
      this.name = this.datastorage.name;
      this.userid = this.datastorage.userid;

      this.area = this.activatedroute.snapshot.paramMap.get('area');

      this.loadPartnerData(this.area);
    });
  }


  async loadPartnerData(area) {
       
    return new Promise(resolve => {
       let body = {
         partner: "process_partner",
         area: area,
       }
       
       this.accessserv.postData(body, 'partner-api.php').subscribe((res:any) =>{
          if(res.success == true) {
            console.log(res.result);
            this.partnerdata = res.result;

            if(this.partnerdata.online == "false") {
              this.onlinestatus = false;
           } else {
             this.onlinestatus = true;
           }
            
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
    this.navCtrl.navigateForward('/partnersearch/' + this.searchvalue + "/" + this.area);
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
