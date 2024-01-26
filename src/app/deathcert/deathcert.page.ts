import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-deathcert',
  templateUrl: './deathcert.page.html',
  styleUrls: ['./deathcert.page.scss'],
})
export class DeathcertPage implements OnInit {

  userid: any;
  datastorage: any;

  name: any;
  deathdate: any;
  deathplace: any;

  deathcertdata: any;

  constructor(private router: Router, 
    private navCtrl: NavController,
  	private accessserv: ServiceService,
    private storage: Storage,
    private storage2: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public platform: Platform,
  ) { }

  ngOnInit() {
    this.storage.get('session_1').then(res=>{
      this.datastorage = res;
      this.userid = this.datastorage.userid;
      this.loadDeathCert(this.userid);
    });

    
  }


  async loadDeathCert(myid) {
       
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
            this.userid = this.deathcertdata.userid;
            this.name = this.deathcertdata.name;
            this.deathdate = this.deathcertdata.deathdate;
            this.deathplace = this.deathcertdata.deathplace;

            console.log(this.name);

  
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
