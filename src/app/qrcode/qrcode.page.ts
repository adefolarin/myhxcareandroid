import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  name: string = "";
  userid: any;
  datastorage: any;

  qrcode: string = "";

  appid: string = "";

  userdata: any;
  qrcodedata: any;

  usertype: any;

  public patient: string;
  public physician: string;
  public hospital: string;
  public organization: string;
  public nurse: string;

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
      this.loadQRCode(this.userid);

      this.usertype = this.datastorage.usertype;

      if(this.usertype == "patient") {
        this.patient = this.usertype;
     }
     if(this.usertype == "physician" || this.usertype == "hospital" || this.usertype == "organization" ||this.usertype == "nurse") {
       this.physician = "physician";
     }
    });

    
  }


  async loadQRCode(myid) {
       
    return new Promise(resolve => {
       let body2 = {
         qrcodedata: "process_qrcodedata",
         myid: myid, 
       }

       console.log(body2);
       
       this.accessserv.postData(body2, 'qrcodedata-api.php').subscribe((res:any) =>{
          if(res.success == true) {
            console.log(res.result);
            this.qrcodedata = res.result;
            this.userid = this.qrcodedata.userid;
            this.qrcode = this.qrcodedata.qrcode;
            this.appid = this.qrcodedata.appid;
            console.log(this.qrcodedata);
  
          } else {
            this.presentAlert("Error in loading your data");
            //this.router.navigate(['/home']);
            console.log("Error in loading your data");
          }
       },(err)=>{
           //this.presentAlert("You have to create an account to have access");
           this.router.navigate(['/home']);
           console.log(err);
       });
  
    });
  
  
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
        },
      ]
    });
    await alert.present();
  }

}
