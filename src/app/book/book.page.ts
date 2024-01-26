import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  id: any;
  datastorage: any;
  userid: any = "";
  name: string = "";
  email: string = "";
  country: string = "";
  address: string = "";
  state: string = "";
  city: string = "";
  pnum: string = "";
  pass: string = "";
  compname: string = "";
  licenseno: string = "";
  appid: string = "";
  reason: string = "";

  partnername: string = "";
  partneremail: string = "";
  partnerpnum: string = "";

  nonpname: string = "";
  nonpemail: string = "";
  nonppnum: string = "";
  nonpreason: string = "";

  disabledButton;

  userdata: any;

  events_tab: string = "profile";

  usertype: string;

  partnerusertype: string;

  partnerid: any;

  partnerformstatus: boolean;
  nonpartnerformstatus: boolean;

  usertypestatus: boolean;

  applink: any;

  searchvalue: any;

  amount: any;
  currency: any;

  public patient: string;
  public physician: string;
  public hospital: string;
  public organization: string;
  public nurse: string;

  constructor(private router: Router, 
    private navCtrl: NavController,
  	private accessserv: ServiceService,
  	private storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public platform: Platform,
    private activatedroute: ActivatedRoute
    ) {}

  ngOnInit() {
      this.storage.get('session_1').then(res=>{
      console.log(res);
      this.datastorage = res;
      this.id = this.datastorage.userid;
      this.loadUserData(this.id);

      this.usertype = this.datastorage.usertype;

     if(this.usertype == "patient") {
        this.patient = this.usertype;
     }
     if(this.usertype == "physician") {
       this.physician = this.usertype;
     }
     if(this.usertype == "hospital") {
       this.hospital = this.usertype;
     }
     if(this.usertype == "organization") {
       this.organization = this.usertype;
     }
     if(this.usertype == "nurse") {
      this.nurse = this.usertype;
    }
    });

    this.partnerid = this.activatedroute.snapshot.paramMap.get('id');

    if(this.partnerid == "noid") {
       this.nonpartnerformstatus = true;
    } else {
       this.partnerformstatus = true;
       this.loadPartnerData(this.partnerid);
    }

    this.applink = "https://play.google.com/store/apps/details?id=com.myhxcare.myapp";

    
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
            this.appid = this.userdata.appid;

          } else {
            this.presentAlert("Error in loading your data");
            this.router.navigate(['/home']);
            //console.log("Error in loading your data");
          }
       },(err)=>{
           this.presentAlert("You have to create an account to have access");
           this.router.navigate(['/home']);
           //console.log(err);
       });

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
            console.log(res.result);
            this.userdata = res.result;
            this.partnerid = this.userdata.userid;
            this.partnername = this.userdata.name;
            this.partneremail = this.userdata.email;
            this.partnerpnum = this.userdata.pnum;
            this.compname = this.userdata.compname;
            this.licenseno = this.userdata.licenseno;
            this.partnerusertype = this.userdata.usertype;
            this.currency = this.userdata.currency;
            this.amount = this.userdata.amount;
            if(this.partnerusertype == "hospital") {
               this.usertypestatus = true;
               console.log(this.partnerusertype);
            } else {
               this.usertypestatus = false;
               console.log(this.partnerusertype);
            }

          } else {
            this.presentAlert("Error in loading your data");
            this.router.navigate(['/home']);
            //console.log("Error in loading your data");
          }
       },(err)=>{
           this.presentAlert("You have to create an account to have access");
           this.router.navigate(['/home']);
           //console.log(err);
       });

    });

 
   }



   loadInvoice() {
    if(this.reason == "") {
      this.presentToast("Please put the reason for your request","danger");
    } else {
     this.navCtrl.navigateForward('/invoice/' + this.userid + '/' + this.partnerid + '/' + this.amount + '/' + this.currency + '/' + this.reason);
     }
   }

   async sendRequestPartner() {
    if(this.reason == "") {
      this.presentToast("Please put the reason for your request","danger");
    } else {

      
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });
      loader.present();
      

       return new Promise(resolve => {
          let body = {
            book: 'process_book',
            userid: this.userid,
            partnerid: this.partnerid,
            appid: this.appid,
            name: this.name,
            pnum: this.pnum,
            email: this.email,
            address: this.address,
            state: this.state,
            country: this.country,
            partneremail: this.partneremail,
            partnerpnum: this.partnerpnum,
            reason: this.reason
          }
          
          this.accessserv.postData(body, 'book-api.php').subscribe((res:any) =>{
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


 /* async sendRequestNonPartner() {
    if(this.nonpname == "") {
      this.presentToast("Name of Partner is required","danger");
    }else if(this.nonpemail == "") {
      this.presentToast("Partner's email is equired","danger");
    }else if(this.nonppnum == "") {
      this.presentToast("Partner's phone number is equired","danger");
    }else if(this.nonpreason == "") {
      this.presentToast("Please put the reason for your request","danger");
    } else {

      
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });
      loader.present();
      

       return new Promise(resolve => {
          let body = {
            book2: 'process_book2',
            userid: this.userid,
            appid: this.appid,
            name: this.name,
            pnum: this.pnum,
            email: this.email,
            address: this.address,
            state: this.state,
            country: this.country,
            nonpname: this.nonpname,
            nonpemail: this.nonpemail,
            nonppnum: this.nonppnum,
            nonpreason: this.nonpreason,
            applink: this.applink
          }
          
          this.accessserv.postData(body, 'book2-api.php').subscribe((res:any) =>{
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
  }*/

   
   
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
