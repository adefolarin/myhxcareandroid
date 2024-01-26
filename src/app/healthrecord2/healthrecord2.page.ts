import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';
import {DomSanitizer,SafeResourceUrl} from "@angular/platform-browser";
import { Plugins } from '@capacitor/core';
import { ThrowStmt } from '@angular/compiler';

const { Browser } = Plugins;

@Component({
  selector: 'app-healthrecord2',
  templateUrl: './healthrecord2.page.html',
  styleUrls: ['./healthrecord2.page.scss'],
})
export class Healthrecord2Page implements OnInit {

  id: any;
  hospid: any;
  partnerid: any;
  name: string = "";
  userid: any;
  datastorage: any;
  status: any;

  usertype: any;

  searchvalue: any;

  searchdata: any;

  mydate: any;
  mydate2: any;

  photo: string = "";
  photolab: string = "";

  userdata: any;
  photodata: any;
  photolabdata: any;

  hospname: any;

  public patient: string;
  public physician: string;
  public hospital: string;
  public organization: string;
  public nurse: string;

  caption: any;
  vaccinecaption: any;

  datetimegetdata: any;

  getdata: any;
  gethospdata: any;
  getlabtestdata: any;

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
 
  

  constructor(private router: Router, 
    private navCtrl: NavController,
    private accessserv: ServiceService,
    private storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public platform: Platform,
    private DomSanitizer:DomSanitizer,
    private activatedroute: ActivatedRoute,
    ) { }
  

    ngOnInit() {
      this.id = this.activatedroute.snapshot.paramMap.get('id');
      this.name = this.activatedroute.snapshot.paramMap.get('name');
      this.hospid = this.activatedroute.snapshot.paramMap.get('hospid');
      this.getAllergyDateTime(this.id,this.hospid);
      this.getVisitDateTime(this.id,this.hospid);
      this.getVaccineDateTime(this.id,this.hospid);
      this.getTestResultDateTime(this.id,this.hospid);
      this.getFutureTestDateTime(this.id,this.hospid);
      this.getStatDateTime(this.id,this.hospid);
      this.getCondDateTime(this.id,this.hospid);
      this.getPrescriptDateTime(this.id,this.hospid);
      this.getData(this.id);
      this.getHospData(this.hospid);

      this.loadDocs(this.id,this.hospid);
      this.loadLabDocs(this.id,this.hospid);
      this.getLabTestData(this.id,this.hospid);
         
     

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

    importHRecord() {
      this.navCtrl.navigateForward('/hrecord2/' + this.id + "/" + this.hospid);
    }

    importLRecord() {
      this.navCtrl.navigateForward('/labrecord/' + this.id + "/" + this.hospid);
    }

    viewImportedHRecord() {
      Browser.open({ url: this.photo});
    }

    viewImportedLRecord() {
      Browser.open({ url: this.photolab});
    }

    addBirthCert() {
      this.navCtrl.navigateForward('/birthcertadd/' + this.id + "/" + this.name);
    }

    addDeathCert() {
      this.navCtrl.navigateForward('/deathcertadd/' + this.id + "/" + this.name);
    }

    viewChart() {
      /*this.platform.ready().then(() => {
        let browser = this.iab.create(this.accessserv.server2+'index.php?userid='+this.id+'&partnerid='+this.partnerid+'&name='+this.name);
      });*/

      Browser.open({ url: this.accessserv.server2+'index.php?userid='+this.id+'&partnerid='+this.partnerid+'&name='+this.name});
    }

    requestHistory() {
      this.navCtrl.navigateForward('/reqrecord/' + this.id + "/" + this.hospid);
    }

    appointmentHistory() {
      this.navCtrl.navigateForward('/appointrecord/' + this.id + "/" + this.hospid);
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

    async getHospData(id)  {

        
      return new Promise(resolve => {
         let body = {
           userdata: "process_userdata",
           myid: id,
         }
         
         this.accessserv.postData(body, 'userdata-api.php').subscribe((res:any) =>{
            if(res.success == true) { 
              this.gethospdata = res.result;
              this.hospname = this.gethospdata.compname;
              //console.log(this.getdata);
            } else {
             
            }
         },(err)=>{
             console.log(err);
         });

      });

   
 }


    async getLabTestData(id,hospid)  {

        
      return new Promise(resolve => {
         let body = {
           labtestdata: "process_labtestdata",
           myid: id,
           hospid: hospid,
         }
         
         this.accessserv.postData(body, 'labtestdata-api.php').subscribe((res:any) =>{
            if(res.success == true) { 
              this.getlabtestdata = res.result;
              //console.log(this.getdata);
            } else {
             
            }
         },(err)=>{
             console.log(err);
         });

      });

   
 }



    async loadDocs(myid,hospid) {
       
      return new Promise(resolve => {
         let body2 = {
           hrecorddata: "process_hrecorddata",
           myid: myid,
           hospid: hospid,
         }
  
         console.log(body2);
         
         this.accessserv.postData(body2, 'hrecorddata-apicopy.php').subscribe((res:any) =>{
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


    async loadLabDocs(myid,hospid) {
       
      return new Promise(resolve => {
         let body2 = {
           hrecordlabdata: "process_hrecordlabdata",
           myid: myid,
           hospid: hospid,
         }
  
         console.log(body2);
         
         this.accessserv.postData(body2, 'hrecordlabdata-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              console.log(res.result);
              this.photolabdata = res.result;
              this.userid = this.photolabdata.userid;
              this.photolab = this.photolabdata.docs;
              console.log(this.photolabdata);
    
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
 

    this.navCtrl.navigateForward('/healthinfo2/' + this.id + "/" + this.hospid + "/"  + this.name + "/"  + mydate + "/" + mydate2);

    
  }


/**********   1) Visits Start   **********/ 

 async getVisitDateTime(myid,hospid)  {

        
  return new Promise(resolve => {
     let body = {
       visitdatetime: "process_visitdatetime",
       myid: myid,
       hospid: hospid,
     }
     
     this.accessserv.postData(body, 'visitdatetime-apicopy.php').subscribe((res:any) =>{
        if(res.success == true) { 
          this.visitdatetimedata = res.result;
          this.visitdatetime = this.visitdatetimedata.mydatetime;
          console.log(this.visitdatetimedata);
          this.loadVisitData(this.id,this.hospid);
        } else {
         
        }
     },(err)=>{
         console.log(err);
     });

  });


}



    async loadVisitData(myid,hospid) {
       
      return new Promise(resolve => {
         let body2 = {
           visitdata: "process_visitdata",
           myid: myid,
           datetime: this.visitdatetime,
           hospid: hospid,
         }
         
         this.accessserv.postData(body2, 'visitdata-apicopy.php').subscribe((res:any) =>{
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


    async getAllergyDateTime(myid,hospid)  {

        
      return new Promise(resolve => {
         let body = {
           allergydatetime2: "process_allergydatetime2",
           myid: myid,
           hospid: hospid,
         }
         
         this.accessserv.postData(body, 'allergydatetime-api2.php').subscribe((res:any) =>{
            if(res.success == true) { 
              this.allergydatetimedata = res.result;
              this.allergydatetime = this.allergydatetimedata.mydatetime;
              console.log(this.allergydatetimedata);
              this.loadAllergyData(this.id,this.hospid);
            } else {
             
            }
         },(err)=>{
             console.log(err);
         });

      });

   
 }


 async loadAllergyData(myid,hospid) {
         
  return new Promise(resolve => {
     let body2 = {
       allergydata2: "process_allergydata2",
       myid: myid, 
       datetime: this.allergydatetime,
       hospid: hospid,
     }

     console.log(body2);
     
     this.accessserv.postData(body2, 'allergydata-api2.php').subscribe((res:any) =>{
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

    async getVaccineDateTime(myid,hospid)  {

            
      return new Promise(resolve => {
        let body = {
          vaccinedatetime: "process_vaccinedatetime",
          myid: myid,
          hospid: hospid,
        }
        
        this.accessserv.postData(body, 'vaccinedatetime-apicopy.php').subscribe((res:any) =>{
            if(res.success == true) { 
              this.vaccinedatetimedata = res.result;
              this.vaccinedatetime = this.vaccinedatetimedata.mydatetime;
              console.log(this.vaccinedatetimedata);
              this.loadVaccineData(this.id,this.hospid);
            } else {
            
            }
        },(err)=>{
            console.log(err);
        });

      });


    }


    async loadVaccineData(myid,hospid) {
        
    return new Promise(resolve => {
    let body2 = {
      vaccinedata: "process_vaccinedata",
      myid: myid, 
      datetime: this.vaccinedatetime,
      hospid: hospid,
    }

    console.log(body2);

    
    this.accessserv.postData(body2, 'vaccinedata-apicopy.php').subscribe((res:any) =>{
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
   
 async getTestResultDateTime(myid,hospid)  {

            
  return new Promise(resolve => {
    let body = {
      testresultdatetime: "process_testresultdatetime",
      myid: myid,
      hospid: hospid,
    }
    
    this.accessserv.postData(body, 'testresultdatetime-apicopy.php').subscribe((res:any) =>{
        if(res.success == true) { 
          this.testresultdatetimedata = res.result;
          this.testresultdatetime = this.testresultdatetimedata.mydatetime;
          console.log(this.testresultdatetimedata);
          this.loadTestResultData(this.id,this.hospid);
        } else {
        
        }
    },(err)=>{
        console.log(err);
    });

  });


}


async loadTestResultData(myid,hospid) {
    
return new Promise(resolve => {
let body2 = {
  testresultdata: "process_testresultdata",
  myid: myid, 
  datetime: this.testresultdatetime,
  hospid: hospid,
}

console.log(body2);

this.accessserv.postData(body2, 'testresultdata-apicopy.php').subscribe((res:any) =>{
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
          

  async getFutureTestDateTime(myid,hospid)  {

            
    return new Promise(resolve => {
      let body = {
        futuretestdatetime: "process_futuretestdatetime",
        myid: myid,
        hospid: hospid,
      }
      
      this.accessserv.postData(body, 'futuretestdatetime-apicopy.php').subscribe((res:any) =>{
          if(res.success == true) { 
            this.futuretestdatetimedata = res.result;
            this.futuretestdatetime = this.futuretestdatetimedata.mydatetime;
            console.log(this.futuretestdatetimedata);
            this.loadFutureTestData(this.id,this.hospid);
          } else {
          
          }
      },(err)=>{
          console.log(err);
      });

    });


  }


  async loadFutureTestData(myid,hospid) {
      
  return new Promise(resolve => {
  let body2 = {
    futuretestdata: "process_futuretestdata",
    myid: myid, 
    datetime: this.futuretestdatetime,
    hospid: hospid,
  }

  console.log(body2);
  
  this.accessserv.postData(body2, 'futuretestdata-apicopy.php').subscribe((res:any) =>{
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
           
  async getStatDateTime(myid,hospid)  {

            
    return new Promise(resolve => {
      let body = {
        statdatetime: "process_statdatetime",
        myid: myid,
        hospid: hospid,
      }
      
      this.accessserv.postData(body, 'statdatetime-apicopy.php').subscribe((res:any) =>{
          if(res.success == true) { 
            this.statdatetimedata = res.result;
            this.statdatetime = this.statdatetimedata.mydatetime;
            console.log(this.statdatetimedata);
            this.loadStatData(this.id,this.hospid);
          } else {
          
          }
      },(err)=>{
          console.log(err);
      });

    });


  }


  async loadStatData(myid,hospid) {
      
  return new Promise(resolve => {
  let body2 = {
    statdata: "process_statdata",
    myid: myid, 
    datetime: this.statdatetime,
    hospid: hospid,
  }

  console.log(body2);
  
  this.accessserv.postData(body2, 'statdata-apicopy.php').subscribe((res:any) =>{
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

  async getCondDateTime(myid,hospid)  {

            
    return new Promise(resolve => {
      let body = {
        conddatetime: "process_conddatetime",
        myid: myid,
        hospid: hospid,
      }
      
      this.accessserv.postData(body, 'conddatetime-apicopy.php').subscribe((res:any) =>{
          if(res.success == true) { 
            this.conddatetimedata = res.result;
            this.conddatetime = this.conddatetimedata.mydatetime;
            console.log(this.conddatetimedata);
            this.loadCondData(this.id,this.hospid);
          } else {
          
          }
      },(err)=>{
          console.log(err);
      });

    });


  }


  async loadCondData(myid,hospid) {
      
  return new Promise(resolve => {
  let body2 = {
    conddata: "process_conddata",
    myid: myid, 
    datetime: this.conddatetime,
    hospid: hospid,
  }

  console.log(body2);
  
  this.accessserv.postData(body2, 'conddata-apicopy.php').subscribe((res:any) =>{
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
       
  async getPrescriptDateTime(myid,hospid)  {

            
    return new Promise(resolve => {
      let body = {
        prescriptdatetime: "process_prescriptdatetime",
        myid: myid,
        hospid: hospid,
      }
      
      this.accessserv.postData(body, 'prescriptdatetime-apicopy.php').subscribe((res:any) =>{
          if(res.success == true) { 
            this.prescriptdatetimedata = res.result;
            this.prescriptdatetime = this.prescriptdatetimedata.mydatetime;
            console.log(this.prescriptdatetimedata);
            this.loadPrescriptData(this.id,this.hospid);
          } else {
          
          }
      },(err)=>{
          console.log(err);
      });

    });


  }


  async loadPrescriptData(myid,hospid) {
      
  return new Promise(resolve => {
  let body2 = {
    prescriptdata: "process_prescriptdata",
    myid: myid, 
    datetime: this.prescriptdatetime,
    hospid: hospid,
  }

  console.log(body2);
  
  this.accessserv.postData(body2, 'prescriptdata-apicopy.php').subscribe((res:any) =>{
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

   /*this.platform.ready().then(() => {
    let browser = this.iab.create(this.accessserv.server+'pdfdata-api.php?userid='+this.id+'&visitdatetime='+this.visitdatetime+'&allergydatetime='+this.allergydatetime+'&testresultdatetime='+this.testresultdatetime+'&name='+this.name+'&vaccinedatetime='+this.vaccinedatetime+'&statdatetime='+this.statdatetime+'&prescriptdatetime='+this.prescriptdatetime+'&futuretestdatetime='+this.futuretestdatetime+'&conddatetime='+this.conddatetime);
   });*/

    Browser.open({ url: this.accessserv.server+'pdfdata-api.php?userid='+this.id+'&visitdatetime='+this.visitdatetime+'&allergydatetime='+this.allergydatetime+'&testresultdatetime='+this.testresultdatetime+'&name='+this.name+'&vaccinedatetime='+this.vaccinedatetime+'&statdatetime='+this.statdatetime+'&prescriptdatetime='+this.prescriptdatetime+'&futuretestdatetime='+this.futuretestdatetime+'&conddatetime='+this.conddatetime});
  }



    bookPatient() {
    this.navCtrl.navigateForward('/bookpatient/' + this.id);
    }

    bookpartner(id:any) {
      this.navCtrl.navigateForward('/book/' + this.hospid);
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
