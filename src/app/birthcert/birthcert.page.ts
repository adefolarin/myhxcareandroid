import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-birthcert',
  templateUrl: './birthcert.page.html',
  styleUrls: ['./birthcert.page.scss'],
})
export class BirthcertPage implements OnInit {

  userid: any;
  datastorage: any;

  name: any;
  fname: any;
  mname: any;
  birthdate: any;
  birthplace: any;
  birthtime: any;
  phyname: any;
  hospname: any;

  birthcertdata: any;

  birthcertstatus: boolean;

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
      this.loadBirthCert(this.userid);
    });

    
  }


  async loadBirthCert(myid) {
       
    return new Promise(resolve => {
       let body2 = {
         birthcertdata: "process_birthcertdata",
         myid: myid, 
       }

       console.log(body2);
       
       this.accessserv.postData(body2, 'birthcertdata-api.php').subscribe((res:any) =>{
          if(res.success == true) {
            
            console.log(res.result);
            this.birthcertdata = res.result;
            if(this.birthcertdata.userid != null) {
              this.birthcertstatus = true;
              this.userid = this.birthcertdata.userid;
              this.name = this.birthcertdata.name;
              this.fname = this.birthcertdata.fname;
              this.mname = this.birthcertdata.mname;
              this.birthdate = this.birthcertdata.birthdate;
              this.birthplace = this.birthcertdata.birthplace;
              this.birthtime = this.birthcertdata.birthtime;
              this.phyname = this.birthcertdata.phyname;
              this.hospname = this.birthcertdata.hospname;
            } else {
              this.birthcertstatus = false;
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
