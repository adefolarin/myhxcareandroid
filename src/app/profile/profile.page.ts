import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';
import { HttpResponse, HttpEventType, HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
//import { File } from '@ionic-native/file';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  id: any;
  datastorage: any;
  userid: any = "";
  name: string = "";
  email: string = "";
  country: string = "";
  address: string = "";
  state: string = "";
  city: string = "";
  //pnum: string = "";
  pnum1: string = "";
  phonenum: string = "";
  pass: string = "";
  compname: string = "";
  licenseno: string = "";
  dob: string = "";
  age: string = "";
  lga: string = "";
  lang: string = "";
  occupation: string = "";
  edulevel: string = "";
  maritalstatus: string = "";
  nextofkin: string = "";
  gender: string = "";
  code: string = "";


  photo: string = "";
  photoname = "Choose a Photo";


  file: File;

  formData: any;

  selectedFiles: FileList;
	currentFile: File;

  disabledButton;

  userdata: any;
  photodata: any;

  position: any;

  areadata: string = "";

  events_tab: string = "profile";

  usertype: string;

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

     if(this.usertype == "patient") {
        this.patient = this.usertype;
     }
     if(this.usertype == "physician" || this.usertype == "hospital" || this.usertype == "organization" ||this.usertype == "nurse") {
       this.physician = "physician";
     }
    });
    //this.id = this.activatedroute.snapshot.paramMap.get('id'); 

    this.loadAreaData();
    
  }

 
     

  ionViewDidEnter() {
    this.disabledButton = false;
    
  } 

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  paybill() {
    this.router.navigate(['/billpay']);
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
            this.email = this.userdata.email;
            this.pnum1 = this.userdata.pnum;
            this.address = this.userdata.address;
            this.country = this.userdata.country;
            this.state = this.userdata.state;
            this.city = this.userdata.city;
            this.compname = this.userdata.compname;
            this.licenseno = this.userdata.licenseno;
              this.age = this.userdata.age;
              this.dob = this.userdata.dob;
              this.lga = this.userdata.lga;
              this.lang = this.userdata.lang;
              this.occupation = this.userdata.occupation;
              this.edulevel = this.userdata.edulevel;
              this.maritalstatus = this.userdata.maritalstatus;
              this.nextofkin = this.userdata.nextofkin;
              this.gender = this.userdata.gender;

          } else {
           //this.presentAlert("Error in loading your data");
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



 getSelectedGenderValue(gender) {
  this.gender = gender;
  console.log(this.gender);
 }

 getSelectedMaritalStatusValue(maritalstatus) {
  this.maritalstatus = maritalstatus;
  console.log(this.maritalstatus);
 }

 getSelectedAreaValue(position) {
  this.position = position;
  console.log(position);
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

  async changeProfile() {
    if(this.name == "" || this.dob == "" || this.address == "" || this.country == "" || this.state == "" || this.city == "" || this.lga == "" || this.lang == "" || this.occupation == "" || this.edulevel == "" || this.maritalstatus == "" || this.nextofkin == "" || this.gender == "") {
      this.presentToast("All fields are required","danger");
    } else {

      
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });
      loader.present();

      let mydob = this.dob.split('T')[0];
      

       return new Promise(resolve => {
          let body = {
            updatedata: 'process_updatedata',
            name: this.name,
            userid: this.userid,
            country: this.country,
            address: this.address,
            state: this.state,
            city: this.city,
            dob: mydob,
            lga: this.lga,
            lang: this.lang,
            occupation: this.occupation,
            edulevel: this.edulevel,
            maritalstatus: this.maritalstatus,
            nextofkin: this.nextofkin,
            gender: this.gender
          }
          
          this.accessserv.postData(body, 'updatedata-api.php').subscribe((res:any) =>{
             if(res.success == true) {
               loader.dismiss();
               this.disabledButton = false;
               this.presentToast(res.msg,"success");
             } else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg,"danger");
             }
          },(err)=>{
              loader.dismiss();
              this.disabledButton = false;
              this.presentAlert('Please Fill the Appropriate Field');
          });

       });

    }
  }


  

  async changeProfile2() {
    if(this.name == "" || this.dob == "" || this.address == "" || this.country == "" || this.state == "" || this.city == "" || this.lga == "" || this.lang == "" || this.edulevel == "" || this.maritalstatus == "" || this.nextofkin == "" || this.gender == "" || this.licenseno == "" || this.compname == "") {
      this.presentToast("All fields are required","danger");
    } else {

      
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });
      loader.present();
      
      let dob = this.dob.split('T')[0];

       return new Promise(resolve => {
          let body = {
            updatedata2: 'process_updatedata2',
            name: this.name,
            userid: this.userid,
            country: this.country,
            address: this.address,
            state: this.state,
            city: this.city,
            compname: this.compname,
            licenseno: this.licenseno,
            dob: dob,
            lga: this.lga,
            lang: this.lang,
            position: this.position,
            edulevel: this.edulevel,
            maritalstatus: this.maritalstatus,
            nextofkin: this.nextofkin,
            gender: this.gender
          }

          console.log(body);
          
          this.accessserv.postData(body, 'updatedata2-api.php').subscribe((res:any) =>{
             if(res.success == true) {
               loader.dismiss();
               this.disabledButton = false;
               this.presentToast(res.msg,"success");
               this.occupation = this.position;
             } else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg,"danger");
             }
          },(err)=>{
              loader.dismiss();
              this.disabledButton = false;
              this.presentAlert('Please Fill the Appropriate Field');
          });

       });

    }
  }


  async getVerificationCode() {
    if(this.email == "") {
      this.presentToast("Email is required","danger");
    } else {
   
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });
      loader.present();
      

       return new Promise(resolve => {
          let body = {
            verify: 'process_verify',
            email: this.email
          }
          
          this.accessserv.postData(body, 'verify-api.php').subscribe((res:any) =>{
             if(res.success == true) {
               loader.dismiss();
               this.disabledButton = false;
               this.presentToast(res.msg,"success");
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



  async changeEmail() {
    if(this.email == "") {
      this.presentToast("Email is required","danger");
    } else if(this.code == "") {
      this.presentToast("Please enter verification code","danger");
    }else {

      
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });
      loader.present();
      

       return new Promise(resolve => {
          let body = {
            updateemail: 'process_updateemail',
            email: this.email,
            code: this.code,
            userid: this.userid,
          }
          
          this.accessserv.postData(body, 'updateemail-api.php').subscribe((res:any) =>{
             if(res.success == true) {
               loader.dismiss();
               this.disabledButton = false;
               this.presentToast(res.msg,"success");
             } else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg,"danger");
              console.log(res.msg);
             }
          },(err)=>{
              loader.dismiss();
              this.disabledButton = false;
              this.presentAlert('Please Fill the Appropriate Field');
              console.log(err);
          });

       });

    }
  }



  async getValue(form) {
    let mypnum = form.value.pnum.internationalNumber;
    let num = mypnum.replace(/\s/g,'');
    //let newnum = num.replace(/\+/g,'');
    this.phonenum = num;
    console.log(num);
 }


 async getCode(form) {

   //if(!form.valid) {
     //this.presentToast("Phone number is required","danger");
   //} else {


  
    /*this.disabledButton = true;
     const loader = await this.loadingCtrl.create({
       message: "Please wait......",
     });
     loader.present();*/

     let mypnum = form.value.pnum.internationalNumber;
     let num = mypnum.replace(/\s/g,'');
     //let newnum = num.replace(/\+/g,'');
     this.phonenum = num;
     

      /*return new Promise(resolve => {
         let body = {
           verify: 'process_verify',
           pnum: num
         }
         
         this.accessserv.postData(body, 'verify-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg,"success");
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

      });*/

   //}
 }



  async changePnum() {
    if(this.phonenum == "") {
      this.presentToast("Phone number is required","danger");
    } else {

      
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });
      loader.present();
      

       return new Promise(resolve => {
          let body = {
            updatepnum: 'process_updatepnum',
            pnum: this.phonenum,
            userid: this.userid,
          }
          
          this.accessserv.postData(body, 'updatepnum-api.php').subscribe((res:any) =>{
             if(res.success == true) {
               loader.dismiss();
               this.disabledButton = false;
               this.presentToast(res.msg,"success");
             } else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg,"danger");
             }
          },(err)=>{
              loader.dismiss();
              this.disabledButton = false;
              this.presentAlert('Please Fill the Appropriate Field');
              console.log(err);
          });

       });

    }
  }



  async changePass() {
    if(this.pass == "") {
      this.presentToast("Password is required","danger");
    } else {

      
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: "Please wait......",
      });
      loader.present();
      

       return new Promise(resolve => {
          let body = {
            updatepass: 'process_updatepass',
            pass: this.pass,
            userid: this.userid,
          }
          
          this.accessserv.postData(body, 'updatepass-api.php').subscribe((res:any) =>{
             if(res.success == true) {
               loader.dismiss();
               this.disabledButton = false;
               this.presentToast(res.msg,"success");
             } else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg,"danger");
             }
          },(err)=>{
              loader.dismiss();
              this.disabledButton = false;
              this.presentAlert('Please Fill the Appropriate Field');
          });

       });

    }
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
    formData.append('userid', this.userid);

    console.log(formData);

    const loader = await this.loadingCtrl.create({
      message: "Please wait......",
    });
    loader.present();

    
    this.http.post(this.accessserv.server+"photo-api.php",formData).subscribe((res:any) => {
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
