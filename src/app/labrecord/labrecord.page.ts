import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';
import { HttpResponse, HttpEventType, HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';

@Component({
  selector: 'app-labrecord',
  templateUrl: './labrecord.page.html',
  styleUrls: ['./labrecord.page.scss'],
})
export class LabrecordPage implements OnInit {

  id: any;
  datastorage: any;
  userid: any = "";
  myuserid: any = "";
  name: any;

  photo: string = "";
  photoname = "Choose a Lab Result";


  file: File;

  formData: any;

  selectedFiles: FileList;
	currentFile: File;

  disabledButton;

  userdata: any;
  photodata: any;

  usertype: string;

  hospid: any;

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
    private activatedroute: ActivatedRoute,
    public http : HttpClient,
    ) {}

  ngOnInit() {
    this.storage.get('session_1').then(res=>{
      console.log(res);
      this.datastorage = res;
      this.id = this.datastorage.userid;
      this.loadUserData(this.id);

      this.usertype = this.datastorage.usertype;

      this.hospid = this.activatedroute.snapshot.paramMap.get('hospid');

     if(this.usertype == "patient") {
        this.patient = this.usertype;
        this.myuserid = this.datastorage.userid;
        this.name = this.datastorage.name;
     }
     if(this.usertype == "physician" || this.usertype == "hospital" || this.usertype == "organization" ||this.usertype == "nurse") {
       this.physician = "physician";
       this.myuserid = this.activatedroute.snapshot.paramMap.get('id');
       this.name = this.activatedroute.snapshot.paramMap.get('name');
     }
    });
    //this.id = this.activatedroute.snapshot.paramMap.get('id'); 
    
  }

 
     

  ionViewDidEnter() {
    this.disabledButton = false;
    
  } 


  async loadUserData(myid) {
       
    return new Promise(resolve => {
       let body2 = {
         userdata: "process_userdata",
         myid: myid, 
       }
       
       this.accessserv.postData(body2, 'userdata-api.php').subscribe((res:any) =>{
          if(res.success == true) {
            console.log(res.result);
            this.userdata = res.result;
            this.userid = this.userdata.userid;
            this.name = this.userdata.name;

          } else {
            this.presentAlert("Error in loading your data");
            this.router.navigate(['/home']);
            //console.log("Error in loading your data");
          }
       },(err)=>{
           //this.presentAlert("You have to create an account to have access");
           this.router.navigate(['/home']);
           //console.log(err);
       });

    });

 
 }


 
     
  onFileChange(event) {
  
    //if (event.target.files.length > 0) {
      this.file = event.target.files[0]; 
      this.photoname = this.file.name;

    //}

    
  }

  async upload() {
    let formData = new FormData();
    formData.append('photo', this.file, this.file.name);
    formData.append('userid', this.myuserid);
    formData.append('hospid', this.hospid);

    console.log(formData);

    const loader = await this.loadingCtrl.create({
      message: "Please wait......",
    });
    loader.present();

    
    this.http.post(this.accessserv.server+"lab-api.php",formData).subscribe((res:any) => {
        console.log(res);
        if(res.success == true) {
          loader.dismiss();
          this.disabledButton = false;
          this.presentToast(res.msg,"success");
        }else {
          loader.dismiss();
          this.disabledButton = false;
          this.presentToast(res.msg,"danger");
         }
    },(err)=>{
          loader.dismiss();
          this.disabledButton = false;
          console.log(err)
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