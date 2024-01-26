import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';
import {DomSanitizer,SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-area',
  templateUrl: './area.page.html',
  styleUrls: ['./area.page.scss'],
})
export class AreaPage implements OnInit {

  id: any;
  name: string = "";
  userid: any;
  datastorage: any;
  status: any;
  partnerid: any;
  patientid: any;
  usertype: any;

  areadata: any;


  public patient: string;
  public physician: string;
  public hospital: string;
  public organization: string;
  public nurse: string;

  getdata: any;

  hospdata: any;
  hospstatus: any;

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
    this.storage.get('session_1').then(res=>{
      console.log(res);
      this.datastorage = res;
      this.usertype = this.datastorage.usertype;
      this.id = this.datastorage.userid;
      this.name = this.datastorage.name;

      this.patientid = this.activatedroute.snapshot.paramMap.get('id');

      this.loadAreaData();

      if(this.usertype == "patient") {
         this.patient = this.usertype;
      } 
      if(this.usertype == "physician" || this.usertype == "hospital" || this.usertype == "organization" 
      || this.usertype == "nurse") {
        this.physician = "physician";
      }

    });
  }


  physicians(area) {
    //this.router.navigate(['/healthinfo']);
    this.navCtrl.navigateForward('/partners/' + area);
  }


  async loadAreaData() {
      
    return new Promise(resolve => {
    let body = {
      area: "process_area",
    }
  
    //console.log(body);
    
    this.accessserv.postData(body, 'area-api.php').subscribe((res:any) =>{
        if(res.success == true) {
          console.log(res.result);
          this.areadata = res.result;
  
        } else {
          console.log("Error in loading your data");
  
        }
    },(err)=>{
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
        }, {
          text: 'Try Again',
          handler: () => {
            //this.contact();
          }
        }
      ]
    });
    await alert.present();
  }

}
