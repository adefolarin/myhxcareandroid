import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController, IonSlides, BooleanValueAccessor } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { partition } from 'rxjs';


interface FormField {
  id: any;
  formField2: { value: any; type: string; disable: boolean; visible: boolean; placeholder: string };
  formField3: { value: any; type: string; disable: boolean; visible: boolean; placeholder: string };
  formField4: { value: any; type: string; disable: boolean; visible: boolean; placeholder: string };
}


@Component({
  selector: 'app-billpay',
  templateUrl: './billpay.page.html',
  styleUrls: ['./billpay.page.scss'],
})
export class BillpayPage implements OnInit {

  name: string = "";
  userid: any;
  servicename: any;
  paydate: any;
  amount: any;
  datastorage: any;
  disabledButton: Boolean;

  myid: number;

  count = 1;

  myvalues = [];

  data: any;

  public mainForm: {
    formFields: FormField[];
  };

  public mainAllergyForm: {
    formFields: FormField[];
  };


  constructor(private router: Router, 
    private navCtrl: NavController,
  	private accessserv: ServiceService,
    private storage: Storage,
    private storage2: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public platform: Platform,
    private commonmodule: CommonModule,
    private ionicmodule: IonicModule,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.storage.get('session_1').then(res=>{
      this.datastorage = res;
      this.name = this.datastorage.name;
      this.userid = this.datastorage.userid;
    });


      this.mainForm = {
        formFields: [],
      };

      this.mainAllergyForm = {
        formFields: [],
      };

      

      // Add an initial form-entry
      this.addForm();
    

  }


/**********   Visits Start   **********/
  public addForm(): void {
    this.mainForm.formFields.push({
        id: this.count++,
        formField2: { value: '', type: 'any', disable: false, visible: true, placeholder: '' },
        formField3: { value: '', type: 'any', disable: false, visible: true, placeholder: '' },
        formField4: { value: '', type: 'any', disable: false, visible: true, placeholder: '' }
    });  
    
  }

    public removeForm(index: number): void {
        this.mainForm.formFields.pop();
        this.myvalues.pop();
    }

    public async submitForm(form) {
        if (form.valid) {

            for(let data of this.mainForm.formFields) {
              let dateformat = data.formField2.value.split('T')[0];
              this.myvalues.push({paydate:dateformat,servicename:data.formField3.value,amount:data.formField4.value});
               
            }
            if(!this.myvalues.length) {
              console.log("Empty Values");
            } else {
              const loader = await this.loadingCtrl.create({
                message: "Please wait......",
              });
              loader.present();

              return new Promise(resolve => {
                let body = {
                  billpay: 'process_billpay',
                  userid: this.userid,
                  myvalues: this.myvalues,
                }
                console.log(body);
                
                this.accessserv.postData(body, 'billpay-api.php').subscribe((res:any) =>{
                   if(res.success == true) {
                     loader.dismiss();
                     this.presentToast(res.msg,"success");
                     console.log(this.myvalues);
                     this.myvalues = [];
                     //console.log(this.myvalues);
                     
                   } else {
                    loader.dismiss();
                    this.presentToast(res.msg,"danger");
                   }
                },(err)=>{
                    loader.dismiss();
                    this.presentAlert('Timeout');
                    console.log(err);
                });
      
             });
             this.myvalues = [];
            }
            
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
              //this.volunteer();
            }
          }
        ]
      });
      await alert.present();
    }
    
    
    async presentAlert2(a) {
      const alert = await this.alertCtrl.create({
        header: a,
        backdropDismiss: false,
        buttons: [
          {
            text: 'Close',
            handler: () => {
              this.navCtrl.navigateForward('/home');
            }
          }, {
            text: 'OK',
            handler: () => {
              this.navCtrl.navigateForward('/home');
            }
          }
        ]
      });
      await alert.present();
    }

}
