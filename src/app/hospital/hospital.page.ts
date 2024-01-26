import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';
import {DomSanitizer,SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.page.html',
  styleUrls: ['./hospital.page.scss'],
})
export class HospitalPage implements OnInit {

  id: any;
  name: string = "";
  userid: any;
  datastorage: any;
  status: any;
  partnerid: any;
  patientid: any;
  usertype: any;


  public patient: string;
  public physician: string;
  public hospital: string;
  public organization: string;
  public nurse: string;

  getdata: any;

  hospdata: any;
  hospstatus: any;

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

      this.patientid = this.activatedroute.snapshot.paramMap.get('id');

      this.loadRegisteredHosp(this.patientid);

      if(this.usertype == "patient") {
         this.patient = this.usertype;
      } 
      if(this.usertype == "physician" || this.usertype == "hospital" || this.usertype == "organization" 
      || this.usertype == "nurse") {
        this.physician = "physician";
      }

    });
  }


  health(hospid) {
    //this.router.navigate(['/healthinfo']);
    this.navCtrl.navigateForward('/healthrecord2/' + this.id + "/" + hospid + "/" + this.name);
  }


  async loadRegisteredHosp(myid) {
       
    return new Promise(resolve => {
       let body2 = {
         hospitaldata: "process_hospitaldata",
         patientid: myid, 
       }

       console.log(body2);
       
       this.accessserv.postData(body2, 'hospitaldata-api.php').subscribe((res:any) =>{
          if(res.success == true) {
            
            console.log(res.result);
            this.hospdata = res.result;
            if(this.hospdata == null) {
               this.hospstatus = false;
               console.log(this.hospdata);
            } else {
              this.hospstatus = true;
              console.log(this.hospdata);
            }

  
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
