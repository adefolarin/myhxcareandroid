import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-bookpatient',
  templateUrl: './bookpatient.page.html',
  styleUrls: ['./bookpatient.page.scss'],
})
export class BookpatientPage implements OnInit {

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
  mydate: string ="";
  mytime: string = "";
  virtual: string = "";
  visit: string = "";

  partnername: string = "";
  partneremail: string = "";
  partnerpnum: string = "";
  partnerstate: string = "";
  partnercountry: string = "";
  partneraddress: string = "";
  partnercity: string = "";

  disabledButton;

  userdata: any;

  events_tab: string = "profile";

  usertype: string;

  partnerid: any;

  partnerformstatus: boolean;
  nonpartnerformstatus: boolean;

  applink: any;

  visitmeans: any;

  timeformat: any;

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
      this.partnerid = this.datastorage.userid;
      this.loadPartnerData(this.partnerid);

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

    this.id = this.activatedroute.snapshot.paramMap.get('id');

       this.loadUserData(this.id);

    
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
            this.partneraddress = this.userdata.address;
            this.partnercountry = this.userdata.country;
            this.partnerstate = this.userdata.state;
            this.partnercity = this.userdata.city;

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

   getTimeValue(mytime) {
    let mytimestring:any = new Date(mytime).toTimeString();
    this.timeformat = mytimestring.split(' ')[0];
    this.timeformat = this.timeformat.replace(/:[^:]*$/,'');
  }

  getSelectedVirtualValue(virtual) {
    this.virtual = virtual;
    this.visitmeans = this.virtual;
  }

   getSelectedUsertypeValue(visit) {
    //console.log(usertype);
    this.visit = visit;
    if(this.visit == "physical") {
      document.getElementById("physicaloffice").style.display = "block";
      document.getElementById("virtualoffice").style.display = "none";
      this.visitmeans = this.partneraddress;
    } else if(this.visit == "virtual") {
      document.getElementById("physicaloffice").style.display = "none";
      document.getElementById("virtualoffice").style.display = "block";
       this.visitmeans = this.virtual;
    }
   }



   async sendPatient() {
    if(this.mydate == "") {
      this.presentToast("Please input date of visit","danger");
    }else if(this.mytime == "") {
      this.presentToast("Please input time of visit","danger");
    }else {

      let dateformat = this.mydate.split('T')[0];
      //let timeformat = this.mytime.

      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });
      loader.present();
      

       return new Promise(resolve => {
          let body = {
            bookpatient: 'process_bookpatient',
            userid: this.userid,
            partnerid: this.partnerid,
            appid: this.appid,
            name: this.name,
            pnum: this.pnum,
            email: this.email,
            partneremail: this.partneremail,
            partnerpnum: this.partnerpnum,
            partnername: this.partnername,
            partneraddress: this.partneraddress,
            partnercountry: this.partnercountry,
            partnerstate: this.partnerstate,
            mydate: dateformat,
            mytime: this.timeformat,
            visitmeans: this.visitmeans,
          }

          console.log(body);
          
          this.accessserv.postData(body, 'bookpatient-api.php').subscribe((res:any) =>{
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
