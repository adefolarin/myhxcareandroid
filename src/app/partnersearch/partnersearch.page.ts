import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { AreaPage } from '../area/area.page';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-partnersearch',
  templateUrl: './partnersearch.page.html',
  styleUrls: ['./partnersearch.page.scss'],
})
export class PartnersearchPage implements OnInit {

  id:any;

  name: string = "";
  userid: any;
  datastorage: any;
  status: any;

  caption: any;

  partnerdata: any;

  searchvalue: any;

  area: any;

  constructor(private router: Router, 
    private navCtrl: NavController,
    private accessserv: ServiceService,
    private storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public platform: Platform,
    private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.area = this.activatedroute.snapshot.paramMap.get('area');
    this.loadPartnerData(this.id,this.area);
  }


  async loadPartnerData(search,area) {
       
    return new Promise(resolve => {
       let body = {
         searchdata: "process_searchdata", 
         search: search,
         area : area,
       }
       
       this.accessserv.postData(body, 'search-api.php').subscribe((res:any) =>{
          if(res.success == true) {
            console.log(res.result);
            this.partnerdata = res.result;
            
            if(this.partnerdata == null) {
              this.caption= "No Partners Available";
              console.log(this.caption);
            }

          } else {
            console.log("Error in loading data");

          }
       },(err)=>{
           console.log(err);
       });

    });

 
   }


   async searchList(event)  {
    this.searchvalue = event.target.value;
    this.navCtrl.navigateForward('/partnersearch/' + this.searchvalue + '/' + this.area);
  }


  bookpartner(id:any) {
    this.navCtrl.navigateForward('/book/' + id);
  }

  biodata2(id:any) {
    this.navCtrl.navigateForward('/biodata2/' + id);
  }

}
