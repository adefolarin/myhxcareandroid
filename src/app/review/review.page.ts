import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

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

  reviewdata: any;
  reviewdata2: any;

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


      this.partnerid = this.activatedroute.snapshot.paramMap.get('id');
      this.partname = this.activatedroute.snapshot.paramMap.get('name');
      this.occupation = this.activatedroute.snapshot.paramMap.get('occupation');

      this.loadReviewData(this.partnerid);

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



    async loadReviewData(myid) {
       
      return new Promise(resolve => {
         let body2 = {
           reviewdata: "process_reviewdata",
           partid: myid, 
         }
         
         this.accessserv.postData(body2, 'reviewdata-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              this.reviewdata = res.result;
              console.log(this.reviewdata);
  
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



     async loadReviewData2(myid) {
       
      return new Promise(resolve => {
         let body2 = {
           reviewdata: "process_reviewdata",
           partid: myid, 
         }
         
         this.accessserv.postData(body2, 'reviewdata-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              this.reviewdata2 = res.result;
              console.log(this.reviewdata);
  
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

  
  
     async sendReview() {
      if(this.revcontent == "") {
        this.presentToast("Please write a review","danger");
      }else {
        this.disabledButton = true;
        const loader = await this.loadingCtrl.create({
          message: "Please wait......",
        });
        loader.present();
        
  
         return new Promise(resolve => {
            let body = {
              review: 'process_review',
              partid: this.partnerid,
              patid: this.userid,
              revcontent: this.revcontent,
            }
  
            console.log(body);
            
            this.accessserv.postData(body, 'review-api.php').subscribe((res:any) =>{
               if(res.success == true) {
                 loader.dismiss();
                 this.disabledButton = false;
                 this.presentToast(res.msg,"success");
                 this.loadReviewData(this.partnerid);
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
