import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-appointrecord2',
  templateUrl: './appointrecord2.page.html',
  styleUrls: ['./appointrecord2.page.scss'],
})
export class Appointrecord2Page implements OnInit {

  name: string = "";
  userid: any;
  id: any;
  datastorage: any;
  status: any;

  caption: any;

  appointdata: any;

  appointdatastatus: boolean;

  appointdata2: any;

  appointdatastatus2: boolean;

  searchvalue: any;

  hospid: any;

  usertype: any;

  public patient: string;
  public physician: string;
  public hospital: string;
  public organization: string;
  public nurse: string;



  constructor(private router: Router, 
    private navCtrl: NavController,
  	private accessserv: ServiceService,
    private storage: Storage,
    private storage2: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public platform: Platform,
    private activatedroute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.hospid = this.activatedroute.snapshot.paramMap.get('hospid');
    this.storage.get('session_1').then(res=>{
      this.datastorage = res;
      this.name = this.datastorage.name;
      this.userid = this.datastorage.userid;
      this.usertype = this.datastorage.usertype;
    });

    if(this.usertype == "patient") {
      this.patient = this.usertype;
   }
   if(this.usertype == "physician" || this.usertype == "hospital" || this.usertype == "organization" 
   || this.usertype == "nurse") {
      this.physician = "physician";
   }

    this.loadAppointmentData(this.id);
    this.loadAppointmentData2(this.id);
  }


  async loadAppointmentData(myid) {
       
    return new Promise(resolve => {
       let body = {
        appointmentdata: "process_appointmentdata",
         myid: myid, 
       }
       
       this.accessserv.postData(body, 'appointmentdata-apicopy2.php').subscribe((res:any) =>{
          if(res.success == true) {
            console.log(res.result);
            this.appointdata = res.result;


          } else {
            console.log("Error in loading your data");

          }
       },(err)=>{
           console.log(err);
       });

    });

 
   }

   async loadAppointmentData2(myid) {
       
    return new Promise(resolve => {
       let body = {
        appointmentdata: "process_appointmentdata",
         myid: myid, 
       }
       
       this.accessserv.postData(body, 'appointmentdata-apicopy2.php').subscribe((res:any) =>{
          if(res.success == true) {
            console.log(res.result);
            this.appointdata2 = res.result;

            console.log(this.appointdata2);


          } else {
            console.log("Error in loading your data");

          }
       },(err)=>{
           console.log(err);
       });

    });

 
   }


}
