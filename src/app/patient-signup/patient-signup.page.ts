import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

import { IonIntlTelInputModule } from 'ion-intl-tel-input';

@Component({
  selector: 'app-patient-signup',
  templateUrl: './patient-signup.page.html',
  styleUrls: ['./patient-signup.page.scss'],
})
export class PatientSignupPage implements OnInit {

  name: string = "";
  email: string = "";
  pass: string = "";
  cpass: string = "";
  pnum: string = "";
  code: string = "";

  phonenum: string = "";

  modules = [];
  mymodules: any;

  val: string = "";

  checkedItems = []

  disabledButton;

  constructor(private router: Router, 
    private navCtrl: NavController,
    private accessserv: ServiceService,
    private storage: Storage,
    private storage2: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }


  ionViewDidEnter() {
    this.disabledButton = false;
  }

  isChecked(item,event) {
    if(event.currentTarget.checked == true) {
      this.checkedItems.push(item);
      if(this.checkedItems.length > 0) {
        this.val = "Checked";
      }    
    } else if(event.currentTarget.checked  == false) {
       this.checkedItems.pop();
       if(this.checkedItems.length == 0) {
        this.val = "";
      };
    }
  }

  home() {
    this.navCtrl.navigateRoot(['./home']);
  } 

  privacyPolicy() {
    this.router.navigate(['/privacypolicy']);
  
   }

  openSignInPage() {
    this.router.navigate(['/sign-in']);
  }

  async getValue(form) {
     let mypnum = form.value.pnum.internationalNumber;
     let num = mypnum.replace(/\s/g,'');
     //let newnum = num.replace(/\+/g,'');
     this.phonenum = num;
     console.log(num);
  }


  async getCode(form) {

    //if(!form.valid) {
      //this.presentToast("Phone number is required","danger");
    //} else {


   
     /* this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });
      loader.present();*/

      let mypnum = form.value.pnum.internationalNumber;
      let num = mypnum.replace(/-|\s/g,'');
      //let num = mypnum.replace(/-|\s/g,'');

      //let newnum = num.replace(/\+/g,'');
      this.phonenum = num;
      

       /*return new Promise(resolve => {
          let body = {
            verify: 'process_verify',
            pnum: num
          }

          console.log(body);
          
          this.accessserv.postData(body, 'verify-api.php').subscribe((res:any) =>{
             if(res.success == true) {
               loader.dismiss();
               this.disabledButton = false;
               this.presentToast(res.msg,"success");
             } else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg,"danger");
             }
          },(err)=>{
              loader.dismiss();
              this.disabledButton = false;
              this.presentAlert('Timeout');
              console.log(err);
          });

       });*/

    //}
  }

  async getVerificationCode() {
    if(this.email == "") {
      this.presentToast("Email is required","danger");
    } else {
   
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });
      loader.present();
      

       return new Promise(resolve => {
          let body = {
            verify: 'process_verify',
            email: this.email
          }
          
          this.accessserv.postData(body, 'verify-api.php').subscribe((res:any) =>{
             if(res.success == true) {
               loader.dismiss();
               this.disabledButton = false;
               this.presentToast(res.msg,"success");
             } else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg,"danger");
             }
          },(err)=>{
              loader.dismiss();
              this.disabledButton = false;
              this.presentAlert('Timeout');
              console.log(err);
          });

       });

    }
  }

  async signup() {
    if(this.name == "") {
      this.presentToast("Name is required","danger");
    } else if(this.code == "") {
      this.presentToast("Please enter verification code","danger");
    } else if(this.phonenum == "") {
      this.presentToast("Phone number is required","danger"); 
    } else if(this.email == "") {
      this.presentToast("Email is required","danger"); 
    } else if(this.pass == "") {
      this.presentToast("Password is required","danger");
    } else if(this.cpass != this.pass) {
      this.presentToast("Password must be the same","danger");
    } else if(this.val == "") {
      this.presentToast("Tick the box to agree to our privacy policy","danger");
    } else {

      
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });
      loader.present();
      

       return new Promise(resolve => {
          let body = {
            register: 'process_register',
            name: this.name,
            code: this.code,
            pass: this.pass,
            cpass: this.cpass,
            pnum: this.phonenum,
            email: this.email,
          }
          
          this.accessserv.postData(body, 'register-api.php').subscribe((res:any) =>{
             if(res.success == true) {
               loader.dismiss();
               this.disabledButton = false;
               this.presentToast(res.msg,"success");
               this.router.navigate(['/sign-in']);
             } else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg,"danger");
             }
          },(err)=>{
              loader.dismiss();
              this.disabledButton = false;
              this.presentAlert('Timeout');
              console.log(err);
          });

       });

    }
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
            this.signup();
          }
        }
      ]
    });
    await alert.present();
  }

}
