import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  name: string = "";
  userid: any;
  datastorage: any;
  status: any;

  caption: any;

  searchvalue: any;

  searchdata: any;

  visitdata: any;
  allergydata: any;
  

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
  }

 
  async searchList(event)  {
    this.searchvalue = event.target.value;
 

       const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });

       loader.present()
      
       return new Promise(resolve => {
          let body = {
            getappid: "process_appid",
            appid: this.searchvalue,
          }
          
          this.accessserv.postData(body, 'appid-api.php').subscribe((res:any) =>{
             if(res.success == true) {
               loader.dismiss(); 
               this.searchdata = res.result;
               if(!this.searchdata) {
                this.presentToast(res.msg,"danger");
               }
               console.log(this.searchdata.userid);
               console.log(this.searchdata.name);

                this.navCtrl.navigateForward('/healthrecord/' + this.searchdata.userid + '/' + this.searchdata.name);
    
               
             } else {
              loader.dismiss();
              this.presentToast(res.msg,"danger");
             }
          },(err)=>{
              loader.dismiss();
              this.presentToast('Invalid App ID',"danger");
              //console.log(err);
          });

       });

    
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
