import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController, IonSlides, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';
import {DomSanitizer,SafeResourceUrl} from "@angular/platform-browser";
import { importType } from '@angular/compiler/src/output/output_ast';
import { Plugins } from '@capacitor/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { TipsPage } from '../tips/tips.page';
const { Network } = Plugins;
const { Browser } = Plugins;
const { Share } = Plugins;
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('slider', { static: false }) slider: IonSlides;

  datastorage: any;
  public name: string;
  usertype: string;
  userid: any;
  licensestatus: string;
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
  age: string = "";
  lga: string = "";
  lang: string = "";
  occupation: string = "";
  edulevel: string = "";
  maritalstatus: string = "";
  nextofkin: string = "";
  gender: string = "";


  photo: string = "";

  userdata: any;
  photodata: any;

  bannerdata: any;

  data: any;

  info:any;
  currentversion: any;

  androidversion: any;
  iphoneversion: any;

  public patient: string;
  public physician: string;
  public hospital: string;
  public organization: string;
  public nurse: string;

  app_url;

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
  };

  constructor(private router: Router, 
    private navCtrl: NavController,
  	private accessserv: ServiceService,
    private storage: Storage,
    private storage2: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public platform: Platform,
    private DomSanitizer:DomSanitizer,
    private modalController: ModalController
  ) { }

  ngOnInit() {

    this.loadBanner();

    this.storage.get('session_1').then(res=>{
      console.log(res);
      this.datastorage = res;
      this.name = this.datastorage.name;
      this.usertype = this.datastorage.usertype;
      this.userid = this.datastorage.userid;
      this.licensestatus = this.datastorage.licensestatus;


      this.loadUserData(this.userid);

      this.getVersionData();
      


      if(this.usertype == "patient") {
         this.patient = this.usertype;
      }
      if(this.usertype == "physician" || this.usertype == "hospital" || this.usertype == "organization" 
      || this.usertype == "nurse") {
        this.physician = "physician";
      }





      //if(this.usertype == "physician" && this.licensestatus == "") {
       //this.presentAlert("Wait for the admin to confirm your license no");
      //}
      //this.userid = this.datastorage.userid;
    });
    
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: TipsPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ionViewWillEnter(){
    this.slider.stopAutoplay(); 

  } 
 
   ionViewDidEnter() {

     /*setInterval(()=> {
       this.singleVideo(); this.singleVideo2() 
     },4000); */
      this.slider.startAutoplay();

      /*if(this.email == "" && this.address == "") {
        this.presentAlert("Please Complete Your Profile");
      }*/
     
   }


   async getVersionData()  {

            
    return new Promise(resolve => {
      let body = {
        versiondata: "process_versiondata",
      }
      
      this.accessserv.postData(body, 'versiondata-api.php').subscribe((res:any) =>{
          if(res.success == true) { 
            this.data = res.result;
            this.androidversion = this.data.versionnumber;
            this.iphoneversion = this.data.versionnumber2;
            console.log(this.data);
          } else {
          
          }
      },(err)=>{
          console.log(err);
      });
  
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
              this.age = this.userdata.age;
              this.dob = this.userdata.dob;
              this.lga = this.userdata.lga;
              this.lang = this.userdata.lang;
              this.occupation = this.userdata.occupation;
              this.edulevel = this.userdata.edulevel;
              this.maritalstatus = this.userdata.maritalstatus;
              this.nextofkin = this.userdata.nextofkin;
              this.gender = this.userdata.gender;

              this.currentversion = this.androidversion;

              this.info = "2.20";

              if(this.currentversion == this.info) {

              if(this.usertype == "patient") {
                if(this.userdata.city == "" || this.userdata.state == "" || this.userdata.email == "" || this.userdata.address == "" || this.userdata.dob == "0000-00-00" || this.userdata.lga == "" || this.userdata.lang == "" || this.userdata.country == "" || this.userdata.gender == "" || this.userdata.occupation == "" || this.userdata.maritalstatus == "" || this.userdata.nextofkin == "" || this.userdata.edulevel == "") {
                      this.presentAlert("Please Complete Your Profile / Email");
                }
              } 
              else {
                  if(this.userdata.city == "" || this.userdata.state == "" || this.userdata.email == "" || this.userdata.address == "" || this.userdata.dob == "0000-00-00" || this.userdata.lga == "" || this.userdata.lang == "" || this.userdata.country == "" || this.userdata.gender == "" || this.userdata.occupation == "" || this.userdata.maritalstatus == "" || this.userdata.nextofkin == "" || this.userdata.edulevel == "") {
                    this.presentAlert3("Please Complete Your Profile / Email");
                  }
                
              }
            }

          } else {
            //this.presentAlert("Error in loading your data");
            //this.presentAlert("Please Complete Your Profile / Email");
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



 async loadUserData2(myid) {
       
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
            this.age = this.userdata.age;
            this.dob = this.userdata.dob;
            this.lga = this.userdata.lga;
            this.lang = this.userdata.lang;
            this.occupation = this.userdata.occupation;
            this.edulevel = this.userdata.edulevel;
            this.maritalstatus = this.userdata.maritalstatus;
            this.nextofkin = this.userdata.nextofkin;
            this.gender = this.userdata.gender;

          
           if(this.userdata.city == "" || this.userdata.state == "" || this.userdata.address == "" || this.userdata.dob == "0000-00-00" || this.userdata.country == "" || this.userdata.gender == "") {
             this.presentAlert2("Please We Need Some Basic Information Before You Can Proceed");
           } else {
             this.router.navigate(['/area']);
           }

           
           

        } else {
          //this.presentAlert("Error in loading your data");
          this.presentAlert2("Please We Need Some Basic Information Before You Can Proceed");
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



async loadUserData3(myid) {
       
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
            this.age = this.userdata.age;
            this.dob = this.userdata.dob;
            this.lga = this.userdata.lga;
            this.lang = this.userdata.lang;
            this.occupation = this.userdata.occupation;
            this.edulevel = this.userdata.edulevel;
            this.maritalstatus = this.userdata.maritalstatus;
            this.nextofkin = this.userdata.nextofkin;
            this.gender = this.userdata.gender;

          
           if(this.userdata.city == "" || this.userdata.state == "" || this.userdata.address == "" || this.userdata.dob == "0000-00-00" || this.userdata.country == "" || this.userdata.gender == "") {
             this.presentAlert2("Please We Need Some Basic Information Before You Can Proceed");
           } else {
             this.router.navigate(['/partners2']);
           }

           
           

        } else {
          //this.presentAlert("Error in loading your data");
          this.presentAlert2("Please We Need Some Basic Information Before You Can Proceed");
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

   async loadBanner() {
     
    return new Promise(resolve => {
       let body = {
         bannerdata: "process_bannerdata",
       }
       
       this.accessserv.postData(body, 'bannerdata-api.php').subscribe((res:any) =>{
          if(res.success == true) {
            this.bannerdata = res.result;
            console.log(this.bannerdata)
          } else {
            console.log("Error in loading banner");
          }
       },(err)=>{
           console.log(err);
       });

    }); 
 
}


  contact() {
    this.router.navigate(['/contact']);
  }


  website() {
    /*this.platform.ready().then(() => {
    let browser = this.iab.create("https://www.kccconline.org/");

    });*/
    this.router.navigate(['/website']);
  
   }


  shareapp() {
    if(this.platform.is('android')) {
      this.app_url = "https://play.google.com/store/apps/details?id=com.myhxcare.myapp";
    } 
    else if(this.platform.is('ios')) {
      this.app_url = "https://apps.apple.com/us/app/myhxcare/id1579677440";
    } 
    Share.share({url: this.app_url,dialogTitle: 'Share with Friends'});
  }


  myaccount() {
    this.router.navigate(['/myaccount']);
  }

  health() {
    //this.router.navigate(['/healthinfo']);
    this.navCtrl.navigateForward('/healthrecord/' + this.userid + "/" + this.name);
  }


  online() {
    this.navCtrl.navigateForward('/online/' + this.userid);
  }

  goToHosp() {
    this.navCtrl.navigateForward('/hospital/' + this.userid);
  }

  search() {
    this.router.navigate(['/search']);
  }

  area() {
      /*if(this.city == "" || this.state == "" || this.address == "" || this.dob == "0000-00-00" || this.country == "" || this.gender == "") {
        this.presentAlert2("Please We Need Some Basic Information Before You Can Proceed");
      } else {
        this.router.navigate(['/partners']);
      }*/
      this.loadUserData2(this.userid);
      
  }

  book() {
    /*if(this.city == "" || this.state == "" || this.address == "" || this.dob == "0000-00-00" || this.country == "" || this.gender == "") {
      this.presentAlert2("Please We Need Some Basic Information Before You Can Proceed");
    } else {
      this.router.navigate(['/partners']);
    }*/
    this.loadUserData3(this.userid);
    
}

  bill() {
    this.router.navigate(['/bill']);
  }

  qrcode() {
    this.router.navigate(['/qrcode']);
  }

  qrscan() {
    this.router.navigate(['/qrscan']);
  }

  scheduleTime() {
    this.router.navigate(['/schedule']);
  }

  fee() {
    this.router.navigate(['/fee']);
  }

  requestHistory() {
    this.navCtrl.navigateForward('/reqrecord2/' + this.userid);
  }

  appointmentHistory() {
    this.navCtrl.navigateForward('/appointrecord2/' + this.userid);
  }

  review() {
    this.navCtrl.navigateForward('/review/' + this.userid + "/" + this.name + "/" + this.occupation);
   }

  viewpatient() {
    this.navCtrl.navigateForward('/patient');
    //this.router.navigate(['/patient']);
   }

   viewbank() {
    this.navCtrl.navigateForward('/bank/' + this.userid);

   }


  async logout() {
    await this.storage.clear();
    //await this.storage2.clear();
    await this.router.navigate(['/sign-in']);
    const toast = await this.toastCtrl.create({
     message: "You have logged out successfully",
     duration: 1500
   });
   await toast.present();
 }


 async presentAlert(a) {
  const alert = await this.alertCtrl.create({
    header: a,
    backdropDismiss: false,
    cssClass: 'alertHeader',
    buttons: [
      {
        text: 'Continue',
        handler: () => {
          this.router.navigate(['/profile']);
        }
      },
      {
        text: 'Skip',
        handler: () => {
          this.router.navigate(['/home']);
        }
      }
    ]
  });
  await alert.present();
}



async presentAlert2(a) {
  const alert = await this.alertCtrl.create({
    header: a,
    backdropDismiss: false,
    cssClass: 'alertHeader',
    buttons: [
      {
        text: 'OK',
        handler: () => {
          this.router.navigate(['/profile2']);
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          this.router.navigate(['/home']);
        }
      }
    ]
  });
  await alert.present();
}


async presentAlert3(a) {
  const alert = await this.alertCtrl.create({
    header: a,
    backdropDismiss: false,
    cssClass: 'alertHeader',
    buttons: [
      {
        text: 'Continue',
        handler: () => {
          this.router.navigate(['/profile']);
        }
      },
      {
        text: '=>',
        handler: () => {
          this.router.navigate(['/profile']);
        }
      }
    ]
  });
  await alert.present();
}



}
