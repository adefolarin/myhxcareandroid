import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';


import { Plugins } from '@capacitor/core';

const { BarcodeScanner } = Plugins;

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.page.html',
  styleUrls: ['./qrscan.page.scss'],
})
export class QrscanPage implements OnInit {

  name: string = "";
  userid: any;
  datastorage: any;
  status: any;

  caption: any;

  searchvalue: any;

  searchdata: any;

  qrdata: any;

  visitdata: any;
  allergydata: any;

  result = null;
  scanActive = false;
  

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
    this.startScanner();
  }

  ngAfterViewInit() {
    BarcodeScanner.prepare();
  }

  ngOnDestroy() {
    //this.stopScanner();
    BarcodeScanner.stopScan();
  }


  async startScanner() {

    const allowed = await this.chceckPermission();

    document.body.style.background = 'transparent';
  
    BarcodeScanner.hideBackground(); // make background of WebView transparent
    if(allowed) {
      this.scanActive = true;
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
  
    // if the result has content
        if (result.hasContent) {
              console.log(result.content); // log the raw scanned content
              this.qrdata = result.content;
              this.searchvalue = result.content;

              

              const loader = await this.loadingCtrl.create({
                message: "Please wait......",
              });

              loader.present();

              
              
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

                        //this.scanActive = false;
            
                      
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
    }
  }


  async chceckPermission() {

        return new Promise(async(resolve,reject) => {
    
        const status = await BarcodeScanner.checkPermission({force: true});
        if(status.granted) {
          resolve(true);
        } else if(status.denied) {
          const alert = await this.alertCtrl.create({
            header: 'No permission',
            backdropDismiss: false,
            message: 'Please allow camera access in your settings',
            cssClass: 'alertHeader',
            buttons: [
              {
                text: 'No',
                role: 'Cancel',
              }, {
                text: 'Open Settings',
                handler: () => {
                  BarcodeScanner.openAppSettings();
                  resolve(false);
                }
              }
            ]
          });
          await alert.present();
        } else {
          resolve(false);
        }
      });
  
  }


  stopScanner() {
    document.body.style.background = 'transparent';
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }



  /*async chceckPermission() {
    
    return new Promise(async(resolve,reject) => {
      const status = await BarcodeScanner.checkPermission({force: true});
      if(status.granted) {
         resolve(true);
      } else if(status.denied) {
        const alert = await this.alertCtrl.create({
          header: 'No permission',
          backdropDismiss: false,
          message: 'Please allow camera access in your settings',
          cssClass: 'alertHeader',
          buttons: [
            {
              text: 'No',
              role: 'Cancel',
            }, {
              text: 'Open Settings',
              handler: () => {
                BarcodeScanner.openAppSettings();
                resolve(false);
              }
            }
          ]
        });
        await alert.present();
      } else {
        resolve(false);
      }
    })

}*/



 
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


  /*async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      header: 'No permission',
      backdropDismiss: false,
      message: 'Please allow camera access in your settings',
      cssClass: 'alertHeader',
      buttons: [
        {
          text: 'No',
          role: 'Cancel',
        }, {
          text: 'Open Settings',
          handler: () => {
            BarcodeScanner.openAppSettings();
            //resolve(false);
          }
        }
      ]
    });
    await alert.present();
  }*/


}
