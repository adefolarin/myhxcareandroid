import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

  durtime = ['15mins','30mins','45mins','1hour'];

  weekday: any;
  timedur: any;

  durtimedata: any;

  timescheduledata: any;

  id: any;
  datastorage: any;
  userid: any = "";

  mydate: string ="";
  mytime: string = "";
  mytime2: string = "";





  userdata: any;

  usertype: string;

  partnerid: any;

  partnerformstatus: boolean;
  nonpartnerformstatus: boolean;


  timeformat: any;

  timeformat2: any;

  disabledButton: boolean;

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

      this.loadTimeScheduleData(this.partnerid);

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



    async loadTimeScheduleData(myid) {
       
      return new Promise(resolve => {
         let body2 = {
           scheduledata: "process_scheduledata",
           mypartnerid: myid, 
         }
         
         this.accessserv.postData(body2, 'timescheduledata-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              this.timescheduledata = res.result;
              console.log(this.timescheduledata);
  
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



    getSelectedWeekDayValue(weekday) {
      this.weekday = weekday;
      console.log(weekday);
   }

   getSelectedDurationValue(timedur) {
    this.timedur = timedur;
    console.log(timedur);
 }
  
  
  
     getTimeValue(mytime) {
      let mytimestring:any = new Date(mytime).toTimeString();
      this.timeformat = mytimestring.split(' ')[0];
      this.timeformat = this.timeformat.replace(/:[^:]*$/,'');
    }

    getTimeValue2(mytime2) {
      let mytimestring:any = new Date(mytime2).toTimeString();
      this.timeformat2 = mytimestring.split(' ')[0];
      this.timeformat2 = this.timeformat2.replace(/:[^:]*$/,'');
    }
    
  
  
     async scheduleTime() {
      if(this.weekday == "") {
        this.presentToast("Please select weekday","danger");
      }else if(this.mytime == "") {
        this.presentToast("Please input start time","danger");
      }else if(this.mytime2 == "") {
        this.presentToast("Please input end time","danger");
      }else if(this.timedur == "") {
        this.presentToast("Please select duration","danger");
      }else {
  
  
        this.disabledButton = true;
        const loader = await this.loadingCtrl.create({
          message: "Please wait......",
        });
        loader.present();
        
  
         return new Promise(resolve => {
            let body = {
              schedule: 'process_schedule',
              partnerid: this.partnerid,
              weekday: this.weekday,
              starttime: this.timeformat,
              endtime: this.timeformat2,
              timeslotduration: this.timedur
            }
  
            console.log(body);
            
            this.accessserv.postData(body, 'timeschedule-api.php').subscribe((res:any) =>{
               if(res.success == true) {
                 loader.dismiss();
                 this.disabledButton = false;
                 this.presentToast(res.msg,"success");
                 this.loadTimeScheduleData(this.partnerid);
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


    async delScheduleTime(id:any) {
  
        this.disabledButton = true;
        const loader = await this.loadingCtrl.create({
          message: "Please wait......",
        });
        loader.present();
        
  
         return new Promise(resolve => {
            let body = {
              scheduledel: 'process_scheduledel',
              schid: id,
            }
  
            console.log(body);
            
            this.accessserv.postData(body, 'timescheduledel-api.php').subscribe((res:any) =>{
               if(res.success == true) {
                 loader.dismiss();
                 this.disabledButton = false;
                 this.presentToast(res.msg,"success");
                 this.loadTimeScheduleData(this.partnerid);
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
