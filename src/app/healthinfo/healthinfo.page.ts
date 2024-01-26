import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';
import {DomSanitizer,SafeResourceUrl} from "@angular/platform-browser";
import { Plugins } from '@capacitor/core';
import { ThrowStmt } from '@angular/compiler';

const { Browser } = Plugins;


@Component({
  selector: 'app-healthinfo',
  templateUrl: './healthinfo.page.html',
  styleUrls: ['./healthinfo.page.scss'],
})
export class HealthinfoPage implements OnInit {

  id: any;
  partnerid: any;
  name: string = "";
  userid: any;
  datastorage: any;
  status: any;

  usertype: any;

  public patient: string;
  public physician: string;
  public hospital: string;
  public organization: string;
  public nurse: string;

  caption: any;
  vaccinecaption: any;

  datetimegetdata: any;

  getdata: any;

  mydate: any;
  mydate2: any;

  visitdata: any;
  allergydata: any;
  vaccinedata: any;
  testresultdata: any;
  futuretestdata: any;
  statdata: any;
  conddata: any;
  prescriptdata: any;

  allergydatetime: any;
  visitdatetime: any;
  vaccinedatetime: any;
  testresultdatetime: any;
  futuretestdatetime: any;
  statdatetime: any;
  conddatetime: any;
  prescriptdatetime: any;


  allergydatetimedata: any;
  visitdatetimedata: any;
  vaccinedatetimedata: any;
  testresultdatetimedata: any;
  futuretestdatetimedata: any;
  statdatetimedata: any;
  conddatetimedata: any;
  prescriptdatetimedata: any;

  photo: string = "";

  userdata: any;
  photodata: any;
 
  

  constructor(private router: Router, 
    private navCtrl: NavController,
    private accessserv: ServiceService,
    private storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public platform: Platform,
    private DomSanitizer:DomSanitizer,
    private activatedroute: ActivatedRoute) { }
  

    ngOnInit() {
      this.id = this.activatedroute.snapshot.paramMap.get('id');
      this.name = this.activatedroute.snapshot.paramMap.get('name');
      this.mydate = this.activatedroute.snapshot.paramMap.get('mydate');
      this.mydate2 = this.activatedroute.snapshot.paramMap.get('mydate2');
      this.getAllergyDateTime(this.id);
      this.getVisitDateTime(this.id);
      this.getVaccineDateTime(this.id);
      this.getTestResultDateTime(this.id);
      this.getFutureTestDateTime(this.id);
      this.getStatDateTime(this.id);
      this.getCondDateTime(this.id);
      this.getPrescriptDateTime(this.id);
      this.getData(this.id);

      this.loadDocs(this.id);
         
     

      this.storage.get('session_1').then(res=>{
        console.log(res);
        this.datastorage = res;
        this.partnerid = this.datastorage.userid;
        this.usertype = this.datastorage.usertype;
  
        if(this.usertype == "patient") {
          this.patient = this.usertype;
       }
       if(this.usertype == "physician" || this.usertype == "hospital" || this.usertype == "nurse") {
         this.physician = "physician";
       }
      });
    }


    updateHealth() {
      this.navCtrl.navigateForward('/healthupdate/' + this.id + "/" + this.name);
    }

    addHealth() {
      this.navCtrl.navigateForward('/healthadd/' + this.id + "/" + this.name);
    }

    addBirthCert() {
      this.navCtrl.navigateForward('/birthcertadd/' + this.id + "/" + this.name);
    }

    addDeathCert() {
      this.navCtrl.navigateForward('/deathcertadd/' + this.id + "/" + this.name);
    }

    viewChart() {
      Browser.open({ url: this.accessserv.server2+'index.php?userid='+this.id+'&partnerid='+this.partnerid+'&name='+this.name});
    }

    viewImportedHRecord() {
      Browser.open({ url: this.photo});
    }

    async getData(id)  {

        
         return new Promise(resolve => {
            let body = {
              userdata: "process_userdata",
              myid: id,
            }
            
            this.accessserv.postData(body, 'userdata-api.php').subscribe((res:any) =>{
               if(res.success == true) { 
                 this.getdata = res.result;
                 //console.log(this.getdata);
               } else {
                
               }
            },(err)=>{
                console.log(err);
            });
  
         });
  
      
    }


    async loadDocs(myid) {
       
      return new Promise(resolve => {
         let body2 = {
           hrecorddata: "process_hrecorddata",
           myid: myid, 
         }
  
         console.log(body2);
         
         this.accessserv.postData(body2, 'hrecorddata-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              console.log(res.result);
              this.photodata = res.result;
              this.userid = this.photodata.userid;
              this.photo = this.photodata.docs;
              console.log(this.photodata);
    
            } else {
              //this.presentAlert("Error in loading your data");
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



    async searchHealthRecords()  {
      let mydate = this.mydate.split('T')[0];
      let mydate2 = this.mydate2.split('T')[0];
   
  
      this.navCtrl.navigateForward('/healthinfo/' + this.id + "/" + this.name + "/"  + mydate + "/" + mydate2);
  
      
    }


/**********   1) Visits Start   **********/ 

 async getVisitDateTime(myid)  {

        
  return new Promise(resolve => {
     let body = {
       visitdatetime: "process_visitdatetime",
       myid: myid,
     }
     
     this.accessserv.postData(body, 'visitdatetime-api.php').subscribe((res:any) =>{
        if(res.success == true) { 
          this.visitdatetimedata = res.result;
          this.visitdatetime = this.visitdatetimedata.mydatetime;
          console.log(this.visitdatetimedata);
          this.loadVisitData(this.id);
        } else {
         
        }
     },(err)=>{
         console.log(err);
     });

  });


}



    async loadVisitData(myid) {
       
      return new Promise(resolve => {
         let body2 = {
           visitsearch: "process_visitsearch",
           myid: myid,
           mydate: this.mydate,
           mydate2: this.mydate2
         }
         
         this.accessserv.postData(body2, 'visitsearch-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              //console.log(res.result);
              this.visitdata = res.result;
              this.visitdata.forEach(value => {
                this.status = value.status;
              });
              
              if(this.status != "true") {
                this.caption= "No Health Records For Office Visits";
              }
  
            } else {
              console.log("Error in loading your data");
  
            }
         },(err)=>{
             console.log(err);
         });
  
      });
  
   
  }

  /**********   1) Visits End   **********/ 


  /************  2) Allergy Starts ********/


    async getAllergyDateTime(myid)  {

        
      return new Promise(resolve => {
         let body = {
           allergydatetime: "process_allergydatetime",
           myid: myid,
         }
         
         this.accessserv.postData(body, 'allergydatetime-api.php').subscribe((res:any) =>{
            if(res.success == true) { 
              this.allergydatetimedata = res.result;
              this.allergydatetime = this.allergydatetimedata.mydatetime;
              console.log(this.allergydatetimedata);
              this.loadAllergyData(this.id);
            } else {
             
            }
         },(err)=>{
             console.log(err);
         });

      });

   
 }


 async loadAllergyData(myid) {
         
  return new Promise(resolve => {
     let body2 = {
       allergysearch: "process_allergysearch",
       myid: myid, 
       mydate: this.mydate,
       mydate2: this.mydate2,
     }

     console.log(body2);
     
     this.accessserv.postData(body2, 'allergysearch-api.php').subscribe((res:any) =>{
        if(res.success == true) {
          console.log(res.result);
          this.allergydata = res.result;
          this.allergydata.forEach(value => {
            this.status = value.status;
          });
          
          if(this.status != "true") {
            this.caption= "No Health Records For Allergies";
          }

        } else {
          console.log("Error in loading your data");

        }
     },(err)=>{
         console.log(err);
     });

  });


 }

 /************  Allergy Ends ********/



 /**********   3)  Vaccine Starts **************/

    async getVaccineDateTime(myid)  {

            
      return new Promise(resolve => {
        let body = {
          vaccinedatetime: "process_vaccinedatetime",
          myid: myid,
        }
        
        this.accessserv.postData(body, 'vaccinedatetime-api.php').subscribe((res:any) =>{
            if(res.success == true) { 
              this.vaccinedatetimedata = res.result;
              this.vaccinedatetime = this.vaccinedatetimedata.mydatetime;
              console.log(this.vaccinedatetimedata);
              this.loadVaccineData(this.id);
            } else {
            
            }
        },(err)=>{
            console.log(err);
        });

      });


    }


    async loadVaccineData(myid) {
        
    return new Promise(resolve => {
    let body2 = {
      vaccinesearch: "process_vaccinesearch",
      myid: myid, 
      mydate: this.mydate,
      mydate2: this.mydate2
    }

    console.log(body2);

    
    this.accessserv.postData(body2, 'vaccinesearch-api.php').subscribe((res:any) =>{
        if(res.success == true) {
          console.log(res.result);
          this.vaccinedata = res.result;
          this.vaccinedata.forEach(value => {
            this.status = value.status;
          });

          console.log(this.status);
          
          if(this.status == "") {
            this.vaccinecaption= "No Health Records For Vaccination";
          }

        } else {
          console.log("Error in loading your data");

        }
    },(err)=>{
        console.log(err);
    });

    });


  }

 /**********    Vaccine Ends **************/



 /**********   4)  Test Result Starts **************/
   
 async getTestResultDateTime(myid)  {

            
  return new Promise(resolve => {
    let body = {
      testresultdatetime: "process_testresultdatetime",
      myid: myid,
    }
    
    this.accessserv.postData(body, 'testresultdatetime-api.php').subscribe((res:any) =>{
        if(res.success == true) { 
          this.testresultdatetimedata = res.result;
          this.testresultdatetime = this.testresultdatetimedata.mydatetime;
          console.log(this.testresultdatetimedata);
          this.loadTestResultData(this.id);
        } else {
        
        }
    },(err)=>{
        console.log(err);
    });

  });


}


async loadTestResultData(myid) {
    
return new Promise(resolve => {
let body2 = {
  testresultsearch: "process_testresultsearch",
  myid: myid, 
  mydate: this.mydate,
  mydate2: this.mydate2
}

console.log(body2);

this.accessserv.postData(body2, 'testresultsearch-api.php').subscribe((res:any) =>{
    if(res.success == true) {
      console.log(res.result);
      this.testresultdata = res.result;
      this.testresultdata.forEach(value => {
        this.status = value.status;
      });
      
      if(this.status != "true") {
        this.caption= "No Health Records For Test Results";
      }

    } else {
      console.log("Error in loading your data");

    }
},(err)=>{
    console.log(err);
});

});


}

 /**********    Test Result Ends ******************/




  /**********   5)  Future Test Starts ********/
          

  async getFutureTestDateTime(myid)  {

            
    return new Promise(resolve => {
      let body = {
        futuretestdatetime: "process_futuretestdatetime",
        myid: myid,
      }
      
      this.accessserv.postData(body, 'futuretestdatetime-api.php').subscribe((res:any) =>{
          if(res.success == true) { 
            this.futuretestdatetimedata = res.result;
            this.futuretestdatetime = this.futuretestdatetimedata.mydatetime;
            console.log(this.futuretestdatetimedata);
            this.loadFutureTestData(this.id);
          } else {
          
          }
      },(err)=>{
          console.log(err);
      });

    });


  }


  async loadFutureTestData(myid) {
      
  return new Promise(resolve => {
  let body2 = {
    futuretestsearch: "process_futuretestsearch",
    myid: myid, 
    mydate: this.mydate,
    mydate2: this.mydate2
  }

  console.log(body2);
  
  this.accessserv.postData(body2, 'futuretestsearch-api.php').subscribe((res:any) =>{
      if(res.success == true) {
        console.log(res.result);
        this.futuretestdata = res.result;
        this.futuretestdata.forEach(value => {
          this.status = value.status;
        });
        
        if(this.status != "true") {
          this.caption= "No Health Records For Future Test Results";
        }

      } else {
        console.log("Error in loading your data");

      }
  },(err)=>{
      console.log(err);
  });

  });


}

 /**********  Future Ends *********************/




  /**********   6)  Stat Starts **************/
           
  async getStatDateTime(myid)  {

            
    return new Promise(resolve => {
      let body = {
        statdatetime: "process_statdatetime",
        myid: myid,
      }
      
      this.accessserv.postData(body, 'statdatetime-api.php').subscribe((res:any) =>{
          if(res.success == true) { 
            this.statdatetimedata = res.result;
            this.statdatetime = this.statdatetimedata.mydatetime;
            console.log(this.statdatetimedata);
            this.loadStatData(this.id);
          } else {
          
          }
      },(err)=>{
          console.log(err);
      });

    });


  }


  async loadStatData(myid) {
      
  return new Promise(resolve => {
  let body2 = {
    statsearch: "process_statsearch",
    myid: myid, 
    mydate: this.mydate,
    mydate2: this.mydate2
  }

  console.log(body2);
  
  this.accessserv.postData(body2, 'statsearch-api.php').subscribe((res:any) =>{
      if(res.success == true) {
        console.log(res.result);
        this.statdata = res.result;
        this.statdata.forEach(value => {
          this.status = value.status;
        });
        
        if(this.status != "true") {
          this.caption= "No Health Records For Health Stats";
        }

      } else {
        console.log("Error in loading your data");

      }
  },(err)=>{
      console.log(err);
  });

  });


}

 /**********  Stat Ends *********************/




  /**********   7)  Cond Starts **************/

  async getCondDateTime(myid)  {

            
    return new Promise(resolve => {
      let body = {
        conddatetime: "process_conddatetime",
        myid: myid,
      }
      
      this.accessserv.postData(body, 'conddatetime-api.php').subscribe((res:any) =>{
          if(res.success == true) { 
            this.conddatetimedata = res.result;
            this.conddatetime = this.conddatetimedata.mydatetime;
            console.log(this.conddatetimedata);
            this.loadCondData(this.id);
          } else {
          
          }
      },(err)=>{
          console.log(err);
      });

    });


  }


  async loadCondData(myid) {
      
  return new Promise(resolve => {
  let body2 = {
    condsearch: "process_condsearch",
    myid: myid, 
    mydate: this.mydate,
    mydate2: this.mydate2
  }

  console.log(body2);
  
  this.accessserv.postData(body2, 'condsearch-api.php').subscribe((res:any) =>{
      if(res.success == true) {
        console.log(res.result);
        this.conddata = res.result;
        this.conddata.forEach(value => {
          this.status = value.status;
        });
        
        if(this.status != "true") {
          this.caption= "No Health Records For Allergies";
        }

      } else {
        console.log("Error in loading your data");

      }
  },(err)=>{
      console.log(err);
  });

  });


}          

 /**********    Cond Ends **************/




  /**********   8) Prescript  Starts **************/
       
  async getPrescriptDateTime(myid)  {

            
    return new Promise(resolve => {
      let body = {
        prescriptdatetime: "process_prescriptdatetime",
        myid: myid,
      }
      
      this.accessserv.postData(body, 'prescriptdatetime-api.php').subscribe((res:any) =>{
          if(res.success == true) { 
            this.prescriptdatetimedata = res.result;
            this.prescriptdatetime = this.prescriptdatetimedata.mydatetime;
            console.log(this.prescriptdatetimedata);
            this.loadPrescriptData(this.id);
          } else {
          
          }
      },(err)=>{
          console.log(err);
      });

    });


  }


  async loadPrescriptData(myid) {
      
  return new Promise(resolve => {
  let body2 = {
    prescriptsearch: "process_prescriptsearch",
    myid: myid, 
    mydate: this.mydate,
    mydate2: this.mydate2
  }

  console.log(body2);
  
  this.accessserv.postData(body2, 'prescriptsearch-api.php').subscribe((res:any) =>{
      if(res.success == true) {
        console.log(res.result);
        this.prescriptdata = res.result;
        this.prescriptdata.forEach(value => {
          this.status = value.status;
        });
        
        if(this.status != "true") {
          this.caption= "No Health Records For Allergies";
        }

      } else {
        console.log("Error in loading your data");

      }
  },(err)=>{
      console.log(err);
  });

  });


}

 /**********    Prescript Ends **************/



async getPDF()  {
  Browser.open({ url: this.accessserv.server+'pdfdata-api.php?myuserid='+this.id+'&mydate='+this.mydate+'&mydate2='+this.mydate2+'&myname='+this.name});
}



bookPatient() {
  this.navCtrl.navigateForward('/bookpatient/' + this.id);
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
