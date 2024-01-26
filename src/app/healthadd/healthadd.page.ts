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
}

interface AllergyFormField {
  id: any;
  formField3: { value: any; type: string; disable: boolean; visible: boolean; placeholder: string };
}

interface TestResultFormField {
  id: any;
  formField1: { value: any; type: string; disable: boolean; visible: boolean; placeholder: string };
  formField2: { value: any; type: string; disable: boolean; visible: boolean; placeholder: string };
  formField3: { value: any; type: string; disable: boolean; visible: boolean; placeholder: string };
}

interface FutureTestFormField {
  id: any;
  formField1: { value: any; type: string; disable: boolean; visible: boolean; placeholder: string };
  formField2: { value: any; type: string; disable: boolean; visible: boolean; placeholder: string };
  formField3: { value: any; type: string; disable: boolean; visible: boolean; placeholder: string };
}

interface CondFormField {
  id: any;
  formField3: { value: any; type: string; disable: boolean; visible: boolean; placeholder: string };
}

interface PrescriptFormField {
  id: any;
  formField3: { value: any; type: string; disable: boolean; visible: boolean; placeholder: string };
}


@Component({
  selector: 'app-healthadd',
  templateUrl: './healthadd.page.html',
  styleUrls: ['./healthadd.page.scss'],
})
export class HealthaddPage implements OnInit {

  name: string = "";
  userid: any;
  otherid: any;
  visitdate: any;
  location: any;
  datastorage: any;
  disabledButton: Boolean;
  disabledAllergyButton: Boolean;
  disabledVaccineButton: Boolean;
  disabledTestResultButton: Boolean;
  disabledStatButton: Boolean;
  disabledCondButton: Boolean;
  disabledPrescriptButton: Boolean;
  disabledFutureTestButton: Boolean;

  systolic: string = "";
  diastolic: string = "";
  pulse: string = "";
  temperature: string = "";
  respiration: string = "";
  weight: string = "";
  height: string = "";
  bodymass: string = "";
  spo2: string = "";

  myid: number;

  count = 1;

  myvalues = [];

  events_tab: string = "visits";

  data: any;

  visitstatus: any;
  allergystatus: any;
  vaccinestatus: any;
  testresultstatus: any;
  statstatus: any;
  condstatus: any;
  futureteststatus: any;
  prescriptstatus: any;

  usertype: string;

  modules = [];
  mymodules: any;

  val: string = "";

  checkedItems = []

  public patient: string;
  public physician: string;
  public hospital: string;
  public organization: string;
  public nurse: string;

  public mainForm: {
    formFields: FormField[];
  };

  public mainAllergyForm: {
    formFields: AllergyFormField[];
  };

  public mainTestResultForm: {
    formFields: TestResultFormField[];
  };

  public mainFutureTestForm: {
    formFields: FutureTestFormField[];
  };

  public mainCondForm: {
    formFields: CondFormField[];
  };

  public mainPrescriptForm: {
    formFields: PrescriptFormField[];
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
    public  platform: Platform,
    private commonmodule: CommonModule,
    private ionicmodule: IonicModule,
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.storage.get('session_1').then(res=>{
      this.datastorage = res;
      
      this.usertype = this.datastorage.usertype;

      this.loadModules();
      

     if(this.usertype == "patient") {
        this.patient = this.usertype;
        this.userid = this.datastorage.userid;
        this.otherid = this.datastorage.userid;
        this.name = this.datastorage.name;
     }
     if(this.usertype == "physician" || this.usertype == "hospital" || this.usertype == "nurse" ) {
       this.physician = "physician";
       this.otherid = this.datastorage.userid;
       this.userid = this.activatedroute.snapshot.paramMap.get('id');
       this.name = this.activatedroute.snapshot.paramMap.get('name');
     }


           
     this.loadVisitData(this.userid);
     this.loadAllergyData(this.userid);
     this.loadVaccineData(this.userid);
     this.loadTestResultData(this.userid);
     this.loadFutureTestData(this.userid);
     this.loadCondData(this.userid);
     this.loadPrescriptData(this.userid);
     this.loadStatData(this.userid);

    });


      this.mainForm = {
        formFields: [],
      };

      this.mainAllergyForm = {
        formFields: [],
      };

      this.mainTestResultForm = {
        formFields: [],
      };

      this.mainFutureTestForm = {
        formFields: [],
      };

      this.mainCondForm = {
        formFields: [],
      };

      this.mainPrescriptForm = {
        formFields: [],
      };

      

      // Add an initial form-entry
      this.addForm();
      this.addAllergy();
      this.addTestResult();
      this.addFutureTest();
      this.addCond();
      this.addPrescript();


      for(let module of this.modules) {
        module.checked = true;
      }    


  }



/**********   1) Visits Start   **********/ 
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
                     if(this.usertype == "patient") {
                       this.disabledButton = false;
                     }
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
           visitstatus: "process_visitstatus",
           myid: myid, 
         }
         
         this.accessserv.postData(body2, 'visitstatus-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              console.log(res.result);
              this.data = res.result;
              this.data.forEach(value => {
                  this.visitstatus = value.status;
              });
              //this.visitstatus = this.data.status;
              if(this.usertype == "patient" && this.visitstatus == "true") {
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



  /************  2) Allergy Starts ********/
   
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
                     if(this.usertype == "patient") {
                       this.disabledAllergyButton = false;
                     }
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
           allergystatus: "process_allergystatus",
           myid: myid, 
         }
         
         this.accessserv.postData(body2, 'allergystatus-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              console.log(res.result);
              this.data = res.result;
              this.data.forEach(value => {
                this.allergystatus = value.status;
              });
              
              if(this.usertype == "patient" && this.allergystatus == "true") {
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

  
  /**********   3)  Vaccine Starts **************/

isChecked(item,event) {
  if(event.currentTarget.checked == true) {
    this.checkedItems.push(item);
    if(this.checkedItems.length > 0) {
      this.val = "Checked";
    }    
  } else if(event.currentTarget.checked  == false) {
     this.checkedItems.pop();
     if(this.checkedItems.length == 0) {
      this.val = "";
    };
  }
}

async loadModules() {
  this.modules.push({vaccinename: "TD / TDAP", checked: 'false'});
  this.modules.push({vaccinename: "HPV AND MENINGOCOCCAL", checked: 'false'});
  this.modules.push({vaccinename: "MMR, VARICELA, AND PNEUMOCOCCAL", checked: 'false'});
  this.modules.push({vaccinename: "FLU VACCINE", checked: 'false'});
  this.modules.push({vaccinename: "HEPATITIS", checked: 'false'});
  this.modules.push({vaccinename: "POLIO, ZOSTER, AND TYPHOID", checked: 'false'})
  this.modules.push({vaccinename: "YELLOW FEVER AND RABBIES", checked: 'false'});
  this.modules.push({vaccinename: "ENCEPHALITIS VACCINE", checked: 'false'});
  this.modules.push({vaccinename: "COVID-19 VACCINE", checked: 'false'})
}


async submitVaccine() {
 if(this.val == "") {
    this.presentToast("Please tick the appropriate vaccines","danger");
  } else {


    let finalmodules = this.modules.filter((x) => {
      return x.checked == true;
    })

    
    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message: "Please wait......",
    });
    loader.present();
    

     return new Promise(resolve => {
        let body = {
          vaccine: 'process_vaccine',
          userid: this.userid,
          otherid: this.otherid,
          myvalues: finalmodules
        }

        console.log(body);
        
        this.accessserv.postData(body, 'vaccine-api.php').subscribe((res:any) =>{
           if(res.success == true) {
             loader.dismiss();
             this.disabledButton = false;
             this.presentToast(res.msg,"success");
             if(this.usertype == "patient") {
              this.disabledVaccineButton = false;
            }
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


async loadVaccineData(myid) {
       
  return new Promise(resolve => {
     let body2 = {
       vaccinestatus: "process_vaccinestatus",
       myid: myid, 
     }
     
     this.accessserv.postData(body2, 'vaccinestatus-api.php').subscribe((res:any) =>{
        if(res.success == true) {
          console.log(res.result);
          this.data = res.result;
          this.data.forEach(value => {
            this.vaccinestatus = value.status;
          });
          
          if(this.usertype == "patient" && this.vaccinestatus == "true") {
            this.disabledVaccineButton = false;
          }

        } else {
          console.log("Error in loading your data");

        }
     },(err)=>{
         console.log(err);
     });

  });


}

/********** Vaccine Ends **************/




/**********  4)  Test Results Start **************/


public addTestResult(): void {
  this.mainTestResultForm.formFields.push({
      id: this.count++,
      formField1: { value: '', type: 'any', disable: false, visible: true, placeholder: '' },
      formField2: { value: '', type: 'any', disable: false, visible: true, placeholder: '' },
      formField3: { value: '', type: 'any', disable: false, visible: true, placeholder: '' }
  });  
  
}

  public removeTestResult(index: number): void {
      this.mainTestResultForm.formFields.pop();
      this.myvalues.pop();
  }

  public async submitTestResult(form) {
      if (form.valid) {

          for(let data of this.mainTestResultForm.formFields) {
            let dateformat = data.formField1.value.split('T')[0];
            this.myvalues.push({trdate:dateformat,testname:data.formField2.value,tresult:data.formField3.value});
             
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
                testresult: 'process_testresult',
                userid: this.userid,
                otherid: this.otherid,
                myvalues: this.myvalues,
              }
              
              this.accessserv.postData(body, 'testresult-api.php').subscribe((res:any) =>{
                 if(res.success == true) {
                   loader.dismiss();
                   this.presentToast(res.msg,"success");
                   console.log(this.myvalues);
                   this.myvalues = [];
                   if(this.usertype == "patient") {
                     this.disabledTestResultButton = false;
                   }
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

  async loadTestResultData(myid) {
     
    return new Promise(resolve => {
       let body2 = {
         testresultstatus: "process_testresultstatus",
         myid: myid, 
       }
       
       this.accessserv.postData(body2, 'testresultstatus-api.php').subscribe((res:any) =>{
          if(res.success == true) {
            console.log(res.result);
            this.data = res.result;
            this.data.forEach(value => {
                this.testresultstatus = value.status;
            });
            //this.visitstatus = this.data.status;
            if(this.usertype == "patient" && this.testresultstatus == "true") {
              this.disabledTestResultButton = false;
            }

          } else {
            console.log("Error in loading your data");

          }
       },(err)=>{
           console.log(err);
       });

    });

 
 }


/********** Test Results Ends **************/



  /******************  5) Health Stat Starts ***************/


  async submitStat() {
    if(this.systolic == "") {
       this.presentToast("All fields are required","danger");
    }else if(this.diastolic == "") {
       this.presentToast("All fields are required","danger");
    }else if(this.pulse == "") {
      this.presentToast("All fields are required","danger");
    }else if(this.temperature == "") {
      this.presentToast("All fields are required","danger");
    }else if(this.respiration == "") {
      this.presentToast("All fields are required","danger");
    }else if(this.weight == "") {
      this.presentToast("All fields are required","danger");
    }else if(this.height == "") {
      this.presentToast("All fields are required","danger");
    }else if(this.bodymass == "") {
      this.presentToast("All fields are required","danger");
    }else if(this.spo2 == "") {
      this.presentToast("All fields are required","danger");
    }
    
     else {

         
       this.disabledButton = true;
       const loader = await this.loadingCtrl.create({
         message: "Please wait......",
       });
       loader.present();
       
   
        return new Promise(resolve => {
           let body = {
             stat: 'process_stat',
             userid: this.userid,
             otherid: this.otherid,
             systolic: this.systolic,
             diastolic: this.diastolic,
             pulse: this.pulse,
             temperature: this.temperature,
             respiration: this.respiration,
             weight: this.weight,
             height: this.height,
             bodymass: this.bodymass,
             spo2: this.spo2,
           }
   
           console.log(body);
           
           this.accessserv.postData(body, 'stat-api.php').subscribe((res:any) =>{
              if(res.success == true) {
                loader.dismiss();
                this.disabledButton = false;
                this.presentToast(res.msg,"success");
                if(this.usertype == "patient") {
                 this.disabledStatButton = false;
               }
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
   
   
   async loadStatData(myid) {
          
     return new Promise(resolve => {
        let body2 = {
          statstatus: "process_statstatus",
          myid: myid, 
        }
        
        this.accessserv.postData(body2, 'statstatus-api.php').subscribe((res:any) =>{
           if(res.success == true) {
             console.log(res.result);
             this.data = res.result;
             this.data.forEach(value => {
               this.statstatus = value.status;
             });
             
             if(this.usertype == "patient" && this.statstatus == "true") {
               this.disabledStatButton = false;
             }
   
           } else {
             console.log("Error in loading your data");
   
           }
        },(err)=>{
            console.log(err);
        });
   
     });
   
   
   }


   /****************** Health Stat Ends ***************/




   /******************  6)  Future Test Starts ***************/
   
   public addFutureTest(): void {
    this.mainFutureTestForm.formFields.push({
        id: this.count++,
        formField1: { value: '', type: 'any', disable: false, visible: true, placeholder: '' },
        formField2: { value: '', type: 'any', disable: false, visible: true, placeholder: '' },
        formField3: { value: '', type: 'any', disable: false, visible: true, placeholder: '' }
    });  
    
  }
  
    public removeFutureTest(index: number): void {
        this.mainFutureTestForm.formFields.pop();
        this.myvalues.pop();
    }
  
    public async submitFutureTest(form) {
        if (form.valid) {
  
            for(let data of this.mainFutureTestForm.formFields) {
              let dateformat = data.formField1.value.split('T')[0];
              this.myvalues.push({trdate:dateformat,testname:data.formField2.value,tresult:data.formField3.value});
               
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
                  futuretest: 'process_futuretest',
                  userid: this.userid,
                  otherid: this.otherid,
                  myvalues: this.myvalues,
                }
                
                this.accessserv.postData(body, 'futuretest-api.php').subscribe((res:any) =>{
                   if(res.success == true) {
                     loader.dismiss();
                     this.presentToast(res.msg,"success");
                     console.log(this.myvalues);
                     this.myvalues = [];
                     if(this.usertype == "patient") {
                       this.disabledFutureTestButton = false;
                     }
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
  
    async loadFutureTestData(myid) {
       
      return new Promise(resolve => {
         let body2 = {
           futureteststatus: "process_futureteststatus",
           myid: myid, 
         }
         
         this.accessserv.postData(body2, 'futureteststatus-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              console.log(res.result);
              this.data = res.result;
              this.data.forEach(value => {
                  this.futureteststatus = value.status;
              });
              //this.visitstatus = this.data.status;
              if(this.usertype == "patient" && this.futureteststatus == "true") {
                this.disabledFutureTestButton = false;
              }
  
            } else {
              console.log("Error in loading your data");
  
            }
         },(err)=>{
             console.log(err);
         });
  
      });
  
   
   }

   /****************** Future Test Ends ***************/




   /******************   7)  Cond Starts *******************/

   public addCond(): void {
    this.mainCondForm.formFields.push({
        id: this.count++,
        formField3: { value: '', type: 'any', disable: false, visible: true, placeholder: '' }
    });  
    
  }

    public removeCond(index: number): void {
        this.mainCondForm.formFields.pop();
        this.myvalues.pop();
    }

    public async submitCond(form) {
        if (form.valid) {

            for(let data of this.mainCondForm.formFields) {
              this.myvalues.push({condname:data.formField3.value});
               
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
                  cond: 'process_cond',
                  userid: this.userid,
                  otherid: this.otherid,
                  myvalues: this.myvalues,
                }
                
                this.accessserv.postData(body, 'cond-api.php').subscribe((res:any) =>{
                   if(res.success == true) {
                     loader.dismiss();
                     this.presentToast(res.msg,"success");
                     console.log(this.myvalues);
                     this.myvalues = [];
                     if(this.usertype == "patient") {
                       this.disabledCondButton = false;
                     }
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

    async loadCondData(myid) {
       
      return new Promise(resolve => {
         let body2 = {
           condstatus: "process_condstatus",
           myid: myid, 
         }
         
         this.accessserv.postData(body2, 'condstatus-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              console.log(res.result);
              this.data = res.result;
              this.data.forEach(value => {
                this.condstatus = value.status;
              });
              
              if(this.usertype == "patient" && this.condstatus == "true") {
                this.disabledCondButton = false;
              }
  
            } else {
              console.log("Error in loading your data");

            }
         },(err)=>{
             console.log(err);
         });
  
      });
  
   
   }
   
   /****************** Cond Ends ********************/





   /******************  8)  Prescript Starts ***************/

    
   public addPrescript(): void {
    this.mainPrescriptForm.formFields.push({
        id: this.count++,
        formField3: { value: '', type: 'any', disable: false, visible: true, placeholder: '' }
    });  
    
  }

    public removePrescript(index: number): void {
        this.mainPrescriptForm.formFields.pop();
        this.myvalues.pop();
    }

    public async submitPrescript(form) {
        if (form.valid) {

            for(let data of this.mainPrescriptForm.formFields) {
              this.myvalues.push({prescriptname:data.formField3.value});
               
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
                  prescript: 'process_prescript',
                  userid: this.userid,
                  otherid: this.otherid,
                  myvalues: this.myvalues,
                }
                
                this.accessserv.postData(body, 'prescript-api.php').subscribe((res:any) =>{
                   if(res.success == true) {
                     loader.dismiss();
                     this.presentToast(res.msg,"success");
                     console.log(this.myvalues);
                     this.myvalues = [];
                     if(this.usertype == "patient") {
                       this.disabledPrescriptButton = false;
                     }
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

    async loadPrescriptData(myid) {
       
      return new Promise(resolve => {
         let body2 = {
           prescriptstatus: "process_prescriptstatus",
           myid: myid, 
         }
         
         this.accessserv.postData(body2, 'prescriptstatus-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              console.log(res.result);
              this.data = res.result;
              this.data.forEach(value => {
                this.prescriptstatus = value.status;
              });
              
              if(this.usertype == "patient" && this.prescriptstatus == "true") {
                this.disabledPrescriptButton = false;
              }
  
            } else {
              console.log("Error in loading your data");

            }
         },(err)=>{
             console.log(err);
         });
  
      });
  
   
   }


   /****************** Prescript Ends *****************/









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
