import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.page.html',
  styleUrls: ['./bank.page.scss'],
})
export class BankPage implements OnInit {


  id: any;
  datastorage: any;
  userid: any = "";

  bankdata: any;

  usertype: string;

  partnerid: any;

  disabledButton: boolean;

  bankname: any;
  accname: any;
  accno: any;

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
            this.userid = this.datastorage.userid;
            this.usertype = this.datastorage.usertype;
      
      
            this.partnerid = this.activatedroute.snapshot.paramMap.get('id');
      
            this.loadBankData(this.userid);
      
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
  
  
      }


      async loadBankData(myid) {
       
        return new Promise(resolve => {
           let body2 = {
             bankdata: "process_bankdata",
             partid: myid, 
           }
           
           this.accessserv.postData(body2, 'bankdata-api.php').subscribe((res:any) =>{
              if(res.success == true) {
                this.bankdata = res.result;
                this.bankname = this.bankdata.bankname;
                this.accname = this.bankdata.accname;
                this.accno = this.bankdata.accno;

                console.log(this.bankdata);
    
              } else {
                //this.presentAlert("Error in loading your data");
                //this.router.navigate(['/home']);
                //console.log("Error in loading your data");
              }
           },(err)=>{
              //this.presentAlert("Error in loading your data");
               //this.router.navigate(['/home']);
               console.log(err);
           });
    
        });
    
     
       }
  

      
       async setBankAccount() {
        if(this.bankname == "") {
          this.presentToast("Bank name is required","danger");
        } else if(this.accname == "") {
          this.presentToast("Acount name is required","danger");
        } else if(this.accno == "") {
          this.presentToast("Account number is required","danger");
        }else {
          this.disabledButton = true;
          const loader = await this.loadingCtrl.create({
            message: "Please wait......",
          });
          loader.present();
          
    
           return new Promise(resolve => {
              let body = {
                bank: 'process_bank',
                partid: this.userid,
                bankname: this.bankname,
                accname: this.accname,
                accno: this.accno,
              }
    
              console.log(body);
              
              this.accessserv.postData(body, 'bank-api.php').subscribe((res:any) =>{
                 if(res.success == true) {
                   loader.dismiss();
                   this.disabledButton = false;
                   this.presentToast(res.msg,"success");
                   this.loadBankData(this.partnerid);
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
