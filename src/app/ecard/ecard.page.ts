import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-ecard',
  templateUrl: './ecard.page.html',
  styleUrls: ['./ecard.page.scss'],
})
export class EcardPage implements OnInit {

  name: string = "";
  age: string = "";
  pnum: string = "";
  country: string = "";
  gender: string = "";
  userid: any;
  datastorage: any;

  photo: string = "";

  userdata: any;
  photodata: any;

  constructor(private router: Router, 
    private navCtrl: NavController,
  	private accessserv: ServiceService,
    private storage: Storage,
    private storage2: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public platform: Platform,
    private home: HomePage,
  ) { }

  ngOnInit() {
    this.storage.get('session_1').then(res=>{
      this.datastorage = res;
      this.name = this.datastorage.name;
      this.pnum = this.datastorage.pnum;
      this.country = this.datastorage.country;
      this.age = this.datastorage.age;
      this.gender = this.datastorage.gender;
      this.userid = this.datastorage.userid;
      this.loadPhoto(this.userid);
      console.log(this.datastorage);
    });

    
  }


  async loadPhoto(myid) {
       
    return new Promise(resolve => {
       let body2 = {
         photodata: "process_photodata",
         myid: myid, 
       }

       console.log(body2);
       
       this.accessserv.postData(body2, 'photodata-api.php').subscribe((res:any) =>{
          if(res.success == true) {
            console.log(res.result);
            this.photodata = res.result;
            this.userid = this.photodata.userid;
            this.photo = this.photodata.pics;
            console.log(this.photodata);
  
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
