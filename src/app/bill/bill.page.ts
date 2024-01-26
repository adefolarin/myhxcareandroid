import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';
import {DomSanitizer,SafeResourceUrl} from "@angular/platform-browser"

@Component({
  selector: 'app-bill',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
})
export class BillPage implements OnInit {
  id: any;
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

  datetimegetdata: any;

  getdata: any;

  billpaydata: any;
  
  billpaydatetime: any;
  billpaydatetimedata: any;

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

        this.getBillPayDateTime(this.id);
        this.getData(this.id);
  
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


    async getBillPayDateTime(myid)  {

        
      return new Promise(resolve => {
         let body = {
           billpaydatetime: "process_billpaydatetime",
           myid: myid,
         }
         
         this.accessserv.postData(body, 'billpaydatetime-api.php').subscribe((res:any) =>{
            if(res.success == true) { 
              this.billpaydatetimedata = res.result;
              this.billpaydatetime = this.billpaydatetimedata.mydatetime;
              console.log(this.billpaydatetimedata);
              this.loadBillPayData(this.id);
            } else {
             
            }
         },(err)=>{
             console.log(err);
         });

      });

   
 }




    async loadBillPayData(myid) {
       
      return new Promise(resolve => {
         let body2 = {
           billpaydata: "process_billpaydata",
           myid: myid,
           datetime: this.billpaydatetime
         }

         console.log(body2);
         
         this.accessserv.postData(body2, 'billpaydata-api.php').subscribe((res:any) =>{
            if(res.success == true) {
              //console.log(res.result);
              this.billpaydata = res.result;
              this.billpaydata.forEach(value => {
                this.status = value.status;
              });
              
              //if(this.status != "true") {
                //this.caption= "No Health Records For Office Visits";
              //}
  
            } else {
              console.log("Error in loading your data");
  
            }
         },(err)=>{
             console.log(err);
         });
  
      });
  
   
     }
  
  


    
     paybill() {
      this.router.navigate(['/paybill']);
    }

}
