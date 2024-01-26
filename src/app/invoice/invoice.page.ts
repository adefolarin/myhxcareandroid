import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';
import {DomSanitizer,SafeResourceUrl} from "@angular/platform-browser";
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {

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


  public patient: string;
  public physician: string;
  public hospital: string;
  public organization: string;
  public nurse: string;

  getdata: any;

  country: any;
  occupation: any;

  constructor(private router: Router, 
    private navCtrl: NavController,
    private accessserv: ServiceService,
    private storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public platform: Platform,
    private DomSanitizer:DomSanitizer,
    private activatedroute: ActivatedRoute) { }
  

  ngOnInit() {
    this.storage.get('session_1').then(res=>{
      console.log(res);
      this.datastorage = res;
      this.usertype = this.datastorage.usertype;
      this.id = this.datastorage.userid;
      this.name = this.datastorage.name;

      this.partnerid = this.activatedroute.snapshot.paramMap.get('partnerid');
      this.patientid = this.activatedroute.snapshot.paramMap.get('patientid');
      this.amount = this.activatedroute.snapshot.paramMap.get('amount');
      this.currency = this.activatedroute.snapshot.paramMap.get('currency');
      this.request = this.activatedroute.snapshot.paramMap.get('request');

      this.loadPartnerData(this.partnerid);

      if(this.usertype == "patient") {
         this.patient = this.usertype;
      } 
      if(this.usertype == "physician" || this.usertype == "hospital" || this.usertype == "organization" 
      || this.usertype == "nurse") {
        this.physician = "physician";
      }

    });
  }



  async loadPartnerData(myid) {
       
    return new Promise(resolve => {
       let body2 = {
         userdata: "process_userdata",
         myid: myid, 
       }
       
       this.accessserv.postData(body2, 'userdata-api.php').subscribe((res:any) =>{
          if(res.success == true) {
            //console.log(res.result);
            this.partnerdata = res.result;
            this.name = this.partnerdata.name;
            this.country = this.partnerdata.country;
            this.occupation = this.partnerdata.occupation;
            this.amount = this.partnerdata.amount;
            this.currency = this.partnerdata.currency;


  

          } else {
            this.presentAlert("Error in loading data");
            this.router.navigate(['/home']);
            //console.log("Error in loading your data");
          }
       },(err)=>{
           //this.presentAlert("You have to create an account to have access");
           this.router.navigate(['/home']);
           //console.log(err);
       });

    });

 
 }


 makePayment() {
  Browser.open({ url: this.accessserv.server2+'hospital/payfee.php?userid='+this.patientid+'&partnerid='+this.partnerid+'&name='+this.name+'&amount='+this.amount+'&currency='+this.currency+'&request='+this.request});
   
   /*this.navCtrl.navigateForward('/feepage/' + this.patientid + "/" + this.partnerid + "/" + this.name + "/" + this.amount + "/" + this.currency + "/" + this.request);*/

   /*this.platform.ready().then(() => {
    let browser = this.iab.create(this.accessserv.server2+'hospital/payfee.php?userid='+this.patientid+'&partnerid='+this.partnerid+'&name='+this.name+'&amount='+this.amount+'&currency='+this.currency+'&request='+this.request);
  });*/
 }





  async presentToast(a,color) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'middle',
      color:color,
    });
    toast.present();
  }


  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: Cancelled');
          }
        }, {
          text: 'Try Again',
          handler: () => {
            //this.contact();
          }
        }
      ]
    });
    await alert.present();
  }

}
