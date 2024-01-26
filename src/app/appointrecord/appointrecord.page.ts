import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-appointrecord',
  templateUrl: './appointrecord.page.html',
  styleUrls: ['./appointrecord.page.scss'],
})
export class AppointrecordPage implements OnInit {

  name: string = "";
  userid: any;
  id: any;
  datastorage: any;
  status: any;

  caption: any;

  appointdata: any;

  appointdatastatus: boolean;

  searchvalue: any;

  hospid: any;


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
    });

    this.loadAppointmentData(this.id,this.hospid);
  }


  async loadAppointmentData(myid,hospid) {
       
    return new Promise(resolve => {
       let body = {
        appointmentdata: "process_appointmentdata",
         myid: myid,
         hospid: hospid, 
       }
       
       this.accessserv.postData(body, 'appointmentdata-apicopy.php').subscribe((res:any) =>{
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


}
