import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';
import {DomSanitizer,SafeResourceUrl} from "@angular/platform-browser"

@Component({
  selector: 'app-biodata',
  templateUrl: './biodata.page.html',
  styleUrls: ['./biodata.page.scss'],
})
export class BiodataPage implements OnInit {

  id: any;
  name: string = "";
  userid: any;
  datastorage: any;
  status: any;

  usertype: any;

  email: string = "";
  country: string = "";
  address: string = "";
  state: string = "";
  city: string = "";
  pnum: string = "";
  pass: string = "";
  compname: string = "";
  licenseno: string = "";
  dob: string = "";
  lga: string = "";
  lang: string = "";
  occupation: string = "";
  edulevel: string = "";
  maritalstatus: string = "";
  nextofkin: string = "";
  gender: string = "";

  public patient: string;
  public physician: string;
  public hospital: string;
  public organization: string;
  public nurse: string;

  caption: any;

  datetimegetdata: any;

  getdata: any;

  userdata: any;
  

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

        this.loadUserData(this.id);
  
        if(this.usertype == "patient") {
           this.patient = this.usertype;
        } 
        if(this.usertype == "physician" || this.usertype == "hospital" || this.usertype == "organization" 
        || this.usertype == "nurse") {
          this.physician = "physician";
        }

      });
    }



    async loadUserData(myid) {
       
      return new Promise(resolve => {
         let body2 = {
           userdata: "process_userdata",
           myid: myid, 
         }
         
         this.accessserv.postData(body2, 'userdata-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              console.log(res.result);
              this.userdata = res.result;
              this.userid = this.userdata.userid;
              this.name = this.userdata.name;
              this.email = this.userdata.email;
              this.pnum = this.userdata.pnum;
              this.address = this.userdata.address;
              this.country = this.userdata.country;
              this.state = this.userdata.state;
              this.city = this.userdata.city;
              this.compname = this.userdata.compname;
              this.licenseno = this.userdata.licenseno;
              this.dob = this.userdata.dob;
              this.lga = this.userdata.lga;
              this.lang = this.userdata.lang;
              this.occupation = this.userdata.occupation;
              this.edulevel = this.userdata.edulevel;
              this.maritalstatus = this.userdata.maritalstatus;
              this.nextofkin = this.userdata.nextofkin;
              this.gender = this.userdata.gender;
  
            } else {
              this.presentAlert("Error in loading your data");
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
        },
      ]
    });
    await alert.present();
  }
  

}
