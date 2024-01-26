import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

import { IonIntlTelInputModule } from 'ion-intl-tel-input';

@Component({
  selector: 'app-physician-signup',
  templateUrl: './physician-signup.page.html',
  styleUrls: ['./physician-signup.page.scss'],
})
export class PhysicianSignupPage implements OnInit {

  name: string = "";
  email: string = "";
  pass: string = "";
  cpass: string = "";
  pnum: string  = "";
  licenseno: string = "";
  compname: string = "";
  code: string = "";

  phonenum: string = "";

  usertype: string = "physician";

  position: string = "";

  areadata: string = "";

  disabledButton;

  modules = [];
  mymodules: any;

  val: string = "";
  val2: string = "";

  checkedItems = [];
  checkedItems2 = [];

  form: string;

  constructor(private router: Router, 
    private navCtrl: NavController,
    private accessserv: ServiceService,
    private storage: Storage,
    private storage2: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
     this.loadAreaData();
     //this.getCode()
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

  isChecked2(item,event) {
    if(event.currentTarget.checked == true) {
      this.checkedItems2.push(item);
      if(this.checkedItems2.length > 0) {
        this.val2 = "Checked";
      }    
    } else if(event.currentTarget.checked  == false) {
       this.checkedItems2.pop();
       if(this.checkedItems2.length == 0) {
        this.val2 = "";
      };
    }
  }

  home() {
    this.navCtrl.navigateRoot(['./home']);
  } 

  openSignInPage() {
    this.router.navigate(['/sign-in']);
  }

  privacyPolicy() {
    this.router.navigate(['/privacypolicy']);
  
  }

  privacyPolicy2() {
    this.router.navigate(['/privacypolicy2']);
  
  }



  getSelectedAreaValue(position) {
    this.position = position;
    console.log(position);
 }

 async getCode(form) {
    //if(!form.valid) {
      //this.presentToast("Phone number is required","danger");
    //} else {
      this.form = form;

      let mypnum = form.value.pnum.internationalNumber;
      let num = mypnum.replace(/-|\s/g,'');
     //let newnum = num.replace(/\+/g,'');
     this.phonenum = num;
   
      /*this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });
      loader.present();*/
      

       /*return new Promise(resolve => {
          let body = {
            verify: 'process_verify',
            pnum: this.phonenum,
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

 

  async loadAreaData() {
      
    return new Promise(resolve => {
    let body = {
      area: "process_area",
    }
  
    //console.log(body);
    
    this.accessserv.postData(body, 'area-api.php').subscribe((res:any) =>{
        if(res.success == true) {
          console.log(res.result);
          this.areadata = res.result;
  
        } else {
          console.log("Error in loading your data");
  
        }
    },(err)=>{
        console.log(err);
    });
  
    });
  
  
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
    } else if(this.compname == "") {
      this.presentToast("Company Name is required","danger");
    } else if(this.position == "") {
      this.presentToast("Area of specialty is required","danger");
    } else if(this.licenseno == "") {
      this.presentToast("License No is required","danger");
    } else if(this.pass == "") {
      this.presentToast("Password is required","danger");
    } else if(this.cpass != this.pass) {
      this.presentToast("Password must be the same","danger");
    } else if(this.val == "") {
      this.presentToast("Tick the box to agree to our privacy policy","danger");
    }  else if(this.val2 == "") {
      this.presentToast("Tick the box to agree to our terms and condtions","danger");
    } else {

      
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });
      loader.present();
      

       return new Promise(resolve => {
          let body = {
            register2: 'process_register2',
            name: this.name,
            code: this.code,
            pass: this.pass,
            cpass: this.cpass,
            pnum: this.phonenum,
            email: this.email,
            licenseno: this.licenseno,
            compname: this.compname,
            usertype: this.usertype,
            position: this.position
          }
          
          this.accessserv.postData(body, 'register2-api.php').subscribe((res:any) =>{
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
