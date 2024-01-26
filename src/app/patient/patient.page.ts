import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit {

  durtimedata: any;

  timescheduledata: any;

  id: any;
  datastorage: any;
  userid: any = "";

  mydate: string ="";
  mytime: string = "";
  mytime2: string = "";

  revcontent: any;





  userdata: any;

  usertype: string;

  partnerid: any;

  partnerformstatus: boolean;
  nonpartnerformstatus: boolean;

  patientdata: any;

  disabledButton: boolean;

  partname: any;
  occupation: any;

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


      this.loadPatientData(this.userid);

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



    async loadPatientData(myid) {
       
      return new Promise(resolve => {
         let body2 = {
           patientdata: "process_patientdata",
           partid: myid, 
         }
         
         this.accessserv.postData(body2, 'patientdata-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              this.patientdata = res.result;
              console.log(this.patientdata);
  
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


     healthrecord(id:any,name:any) {
      this.navCtrl.navigateForward('/healthrecord/' + id + '/' + name);
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
