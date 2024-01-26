import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';


interface FormField {
  id: any;
  formField2: { value: any; type: string; disable: boolean; visible: boolean; placeholder: string };
  formField3: { value: any; type: string; disable: boolean; visible: boolean; placeholder: string };
}

interface AllergyFormField {
  id: any;
  formField3: { value: any; type: string; disable: boolean; visible: boolean; placeholder: string };
}

@Component({
  selector: 'app-healthupdate',
  templateUrl: './healthupdate.page.html',
  styleUrls: ['./healthupdate.page.scss'],
})
export class HealthupdatePage implements OnInit {

  id: any;
  name: string = "";
  userid: any;
  otherid: any;
  visitdate: any;
  location: any;
  datastorage: any;
  disabledButton: Boolean;
  disabledAllergyButton: Boolean;

  myid: number;

  count = 1;

  myvalues = [];

  events_tab: string = "visits";

  data: any;

  visitstatus: any;

  allergystatus: any;

  public mainForm: {
    formFields: FormField[];
  };

  public mainAllergyForm: {
    formFields: AllergyFormField[];
  };


  //healthForm: FormGroup;
 

  constructor(private router: Router, 
    private navCtrl: NavController,
  	private accessserv: ServiceService,
    private storage: Storage,
    private storage2: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public platform: Platform,
    private activatedroute: ActivatedRoute
  ) { }
  

    ngOnInit() {

      this.storage.get('session_1').then(res=>{
        this.datastorage = res;
        this.otherid = this.datastorage.userid;
  
      });


      this.userid = this.activatedroute.snapshot.paramMap.get('id');
      this.name = this.activatedroute.snapshot.paramMap.get('name');




      this.mainForm = {
        formFields: [],
      };

      this.mainAllergyForm = {
        formFields: [],
      };

      

      // Add an initial form-entry
      this.addForm();
      this.addAllergy();
    }




    /**********   Visits Start   **********/
  public addForm(): void {
    this.mainForm.formFields.push({
        id: this.count++,
        formField2: { value: '', type: 'any', disable: false, visible: true, placeholder: '' },
        formField3: { value: '', type: 'any', disable: false, visible: true, placeholder: '' }
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
              this.myvalues.push({visitdate:dateformat,visitplace:data.formField3.value});
               
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
                  visit: 'process_visit',
                  userid: this.userid,
                  otherid: this.otherid,
                  myvalues: this.myvalues,
                }
                
                this.accessserv.postData(body, 'visit-api.php').subscribe((res:any) =>{
                   if(res.success == true) {
                     loader.dismiss();
                     this.presentToast(res.msg,"success");
                     console.log(this.myvalues);
                     this.myvalues = [];
                     this.disabledButton = false;
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

    async loadVisitData(myid) {
       
      return new Promise(resolve => {
         let body2 = {
           visitdata: "process_visitdata",
           myid: myid, 
         }
         
         this.accessserv.postData(body2, 'visitdata-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              console.log(res.result);
              this.data = res.result;
              this.data.forEach(value => {
                  this.visitstatus = value.status;
              });
              //this.visitstatus = this.data.status;
              if(this.visitstatus == "true") {
                this.disabledButton = false;
              }
  
            } else {
              console.log("Error in loading your data");

            }
         },(err)=>{
             console.log(err);
         });
  
      });
  
   
   }

   /**********   Visits Ends   **********/

  /************   Allergy Starts ********/
   
  public addAllergy(): void {
    this.mainAllergyForm.formFields.push({
        id: this.count++,
        formField3: { value: '', type: 'any', disable: false, visible: true, placeholder: '' }
    });  
    
  }

    public removeAllergy(index: number): void {
        this.mainAllergyForm.formFields.pop();
        this.myvalues.pop();
    }

    public async submitAllergy(form) {
        if (form.valid) {

            for(let data of this.mainAllergyForm.formFields) {
              this.myvalues.push({allergyname:data.formField3.value});
               
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
                  allergy: 'process_allergy',
                  userid: this.userid,
                  otherid: this.otherid,
                  myvalues: this.myvalues,
                }
                
                this.accessserv.postData(body, 'allergy-api.php').subscribe((res:any) =>{
                   if(res.success == true) {
                     loader.dismiss();
                     this.presentToast(res.msg,"success");
                     console.log(this.myvalues);
                     this.myvalues = [];
                     this.disabledAllergyButton = false;
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

    async loadAllergyData(myid) {
       
      return new Promise(resolve => {
         let body2 = {
           allergydata: "process_allergydata",
           myid: myid, 
         }
         
         this.accessserv.postData(body2, 'allergydata-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              console.log(res.result);
              this.data = res.result;
              this.data.forEach(value => {
                this.allergystatus = value.status;
              });
              
              if(this.allergystatus == "true") {
                this.disabledAllergyButton = false;
              }
  
            } else {
              console.log("Error in loading your data");

            }
         },(err)=>{
             console.log(err);
         });
  
      });
  
   
   }

  /************   Allergy Ends **********/


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
