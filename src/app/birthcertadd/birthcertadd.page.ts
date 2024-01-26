import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-birthcertadd',
  templateUrl: './birthcertadd.page.html',
  styleUrls: ['./birthcertadd.page.scss'],
})
export class BirthcertaddPage implements OnInit {

  name: string = "";
  fname: string = "";
  mname: string = "";
  birthdate: string = "";
  birthplace: string = "";
  partnerid: any;
  userid: any;
  disabledButton: Boolean;
  datastorage: any;
  mydate: string ="";

  birthcertdata: any;

  birthcertstatus: boolean;

  birthtime: any;
  timeformat: any;

  phyname: any;
  hospname: any;

  constructor(private router: Router, 
    private navCtrl: NavController,
  	private accessserv: ServiceService,
  	private storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private activatedroute: ActivatedRoute) { }

  ngOnInit() {

    this.storage.get('session_1').then(res=>{
      this.datastorage = res;
      this.partnerid = this.datastorage.userid;

    });


    this.userid = this.activatedroute.snapshot.paramMap.get('id');
    this.name = this.activatedroute.snapshot.paramMap.get('name');

    this.loadBirthCertStatus(this.userid)
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }


  async loadBirthCertStatus(myid) {
       
    return new Promise(resolve => {
       let body2 = {
         birthcertstatus: "process_birthcertstatus",
         myid: myid, 
       }

       console.log(body2);
       
       this.accessserv.postData(body2, 'birthcertstatus-api.php').subscribe((res:any) =>{
          if(res.success == true) {
            
            console.log(res.result);
            this.birthcertdata = res.result;
            if(this.birthcertdata.status == null) {
               this.birthcertstatus = false;
            } else {
              this.birthcertstatus = true;
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


  getTimeValue(mytime) {
    let mytimestring:any = new Date(mytime).toTimeString();
    this.timeformat = mytimestring.split(' ')[0];
    this.timeformat = this.timeformat.replace(/:[^:]*$/,'');
  }


 
  async submitBirthCert() {
    if(this.name == "") {
      this.presentToast("Name is required","danger");
    } else if(this.fname == "") {
      this.presentToast("Father's name is required","danger");
    } else if(this.mname == "") {
      this.presentToast("Mother'name is required","danger");
    } else if(this.birthdate == "") {
      this.presentToast("Date of birth is required?","danger");
    } else if(this.birthplace == "") {
      this.presentToast("Place of birth is required?","danger");
    } else if(this.timeformat == "") {
      this.presentToast("Time of birth is required?","danger");
    } else if(this.phyname == "") {
      this.presentToast("Name of physician is required?","danger");
    } else if(this.hospname == "") {
      this.presentToast("Name of hospital is required?","danger");
    } else {

      
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });
      loader.present();

      let dateformat = this.birthdate.split('T')[0];
      

       return new Promise(resolve => {
          let body = {
            birthcert: 'process_birthcert',
            userid: this.userid,
            partnerid: this.partnerid,
            name: this.name,
            fname: this.fname,
            mname: this.mname,
            birthdate: dateformat,
            birthplace: this.birthplace,
            birthtime: this.timeformat,
            phyname: this.phyname,
            hospname: this.hospname,
          }
          
          this.accessserv.postData(body, 'birthcert-api.php').subscribe((res:any) =>{
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
