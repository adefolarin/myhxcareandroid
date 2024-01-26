import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  //pnum: string = "";
  pass: string = "";
  email: string = "";

  disabledButton;

  usertype: string = "";

  constructor(private router: Router, 
    private accessserv: ServiceService,
    private storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,) { }

  ngOnInit() {
  }


  ionViewDidEnter() {
    this.disabledButton = false;
  }

  password() {
    this.router.navigate(['./forgot-password']);
  } 


  async signinGuest() {
    await this.storage.set("session_1", {name:"Guest"}); // Create Storage Session
    this.router.navigate(['/home']);
 
  }

  openSignUpPage() {
    this.router.navigate(['/sign-up']);
  }

  getSelectedUsertypeValue(usertype) {
     //console.log(usertype);
     this.usertype = usertype;
  }


  async signin() {
    if(this.email == "") {
      this.presentToast("Email is required","danger");
    } else if(this.pass == "") {
      this.presentToast("Password is required","danger");
    } else if(this.usertype == "") {
      this.presentToast("Select a usertype","danger");
    }  else {

       this.disabledButton = true;

       const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });

       loader.present()
      
       return new Promise(resolve => {
          let body = {
            login: "process_login",
            email: this.email,
            pass: this.pass,
            usertype: this.usertype
          }
          
          this.accessserv.postData(body, 'login-api.php').subscribe((res:any) =>{
             if(res.success == true) {
               loader.dismiss();
               this.disabledButton = false;
               this.presentToast("Login Successful","success"); 
                this.storage.set("session_1", res.result); // Create Storage Session
                this.router.navigate(['/home']);
     
               
             } else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg,"danger");
             }
          },(err)=>{
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast('Timeout',"danger");
              //console.log(err);
          });

       });

    }
  }



  async presentToast(a,color) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      color:color,
      position:'middle'
    });
    toast.present();
  }

}
