import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.page.html',
  styleUrls: ['./fee.page.scss'],
})
export class FeePage implements OnInit {

  curs = ['USD','GBP','NGN'];

  cur: any;
  fee: any;


  amount: any;
  currency: any;
  status: any;

  feedata: any;

  id: any;
  datastorage: any;
  userid: any = "";

 

  userdata: any;

  usertype: string;

  partnerid: any;

  partnerformstatus: boolean;
  nonpartnerformstatus: boolean;


  timeformat: any;

  timeformat2: any;

  disabledButton: boolean;
  disabledFeeButton: boolean;

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
      this.usertype = this.datastorage.usertype;

      this.loadFeeData(this.partnerid);

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

      //this.userid = this.activatedroute.snapshot.paramMap.get('id');


    }



    async loadFeeData(myid) {
       
      return new Promise(resolve => {
         let body2 = {
           feedata: "process_feedata",
           mypartnerid: myid, 
         }
         
         this.accessserv.postData(body2, 'feedata-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              console.log(res.result);
              this.feedata = res.result;
              this.amount = this.feedata.amount;
              this.status = this.feedata.status;
              this.currency = this.feedata.currency;

              if(this.status == "true") {
                this.disabledButton = true;
                this.disabledFeeButton = false;
              }

              //if(this.currency == "NGN") {
                //this.amount = "&#x20A6;" + this.amount;
              //}
              console.log(this.amount);
  
            } else {
              //this.presentAlert("Error in loading your data");
              //this.router.navigate(['/home']);
              //console.log("Error in loading your data");
              this.disabledFeeButton = true;
            }
         },(err)=>{
            //this.presentAlert("Error in loading your data");
             //this.router.navigate(['/home']);
             console.log(err);
         });
  
      });
  
   
     }



    getSelectedFeeValue(cur) {
      this.cur = cur;
      console.log(cur);
   }

  
  
     async setFee() {
      if(this.cur == "") {
        this.presentToast("Please select currency","danger");
      }else if(this.fee == "") {
        this.presentToast("Please input your fee","danger");
      }else {
  
  
        this.disabledButton = true;
        const loader = await this.loadingCtrl.create({
          message: "Please wait......",
        });
        loader.present();
        
  
         return new Promise(resolve => {
            let body = {
              fee: 'process_fee',
              partnerid: this.partnerid,
              amount: this.fee,
              currency: this.cur,
            }
  
            console.log(body);
            
            this.accessserv.postData(body, 'fee-api.php').subscribe((res:any) =>{
               if(res.success == true) {
                 loader.dismiss();
                 this.disabledButton = true;
                 this.presentToast(res.msg,"success");
                 this.loadFeeData(this.partnerid);
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


    reqFee() {
      this.router.navigate(['/changefee']);
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
