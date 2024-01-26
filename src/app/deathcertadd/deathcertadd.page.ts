import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-deathcertadd',
  templateUrl: './deathcertadd.page.html',
  styleUrls: ['./deathcertadd.page.scss'],
})
export class DeathcertaddPage implements OnInit {

  name: string = "";
  deathdate: string = "";
  deathplace: string = "";
  partnerid: any;
  userid: any;
  disabledButton: Boolean;
  datastorage: any;
  mydate: string ="";

  deathcertdata: any;

  deathcertstatus: boolean;

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

    this.loadDeathCertStatus(this.userid); 
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }


  async loadDeathCertStatus(myid) {
       
    return new Promise(resolve => {
       let body2 = {
         deathcertdata: "process_deathcertdata",
         myid: myid, 
       }

       console.log(body2);
       
       this.accessserv.postData(body2, 'deathcertdata-api.php').subscribe((res:any) =>{
          if(res.success == true) {
            
            console.log(res.result);
            this.deathcertdata = res.result;
            if(this.deathcertdata.certstatus == null) {
               this.deathcertstatus = true;
            } else {
              this.deathcertstatus = false;
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

 
  async submitDeathCert() {
    if(this.name == "") {
      this.presentToast("Name is required","danger");
    } else if(this.deathdate == "") {
      this.presentToast("Date of death is required?","danger");
    } else if(this.deathplace == "") {
      this.presentToast("Place of death is required?","danger");
    }else {

      
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });
      loader.present();

      let dateformat = this.deathdate.split('T')[0];
      

       return new Promise(resolve => {
          let body = {
            deathcert: 'process_deathcert',
            userid: this.userid,
            partnerid: this.partnerid,
            name: this.name,
            deathdate: dateformat,
            deathplace: this.deathplace,  
          }
          
          this.accessserv.postData(body, 'deathcert-api.php').subscribe((res:any) =>{
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
