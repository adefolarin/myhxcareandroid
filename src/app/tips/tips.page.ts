import { Component, OnInit} from '@angular/core';

import { Storage } from '@ionic/Storage';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {

  datastorage: any;
  public name: string;
  usertype: string;
  userid: any;

  public patient: string;
  public physician: string;
  public hospital: string;
  public organization: string;
  public nurse: string;

  constructor(private modalController: ModalController,private storage: Storage) {}

  ngOnInit() {
    this.storage.get('session_1').then(res=>{
      console.log(res);
      this.datastorage = res;
      this.name = this.datastorage.name;
      this.usertype = this.datastorage.usertype;
      this.userid = this.datastorage.userid;
      


      if(this.usertype == "patient") {
         this.patient = this.usertype;
      }
      if(this.usertype == "physician" || this.usertype == "hospital" || this.usertype == "organization" 
      || this.usertype == "nurse") {
        this.physician = "physician";
      }





      //if(this.usertype == "physician" && this.licensestatus == "") {
       //this.presentAlert("Wait for the admin to confirm your license no");
      //}
      //this.userid = this.datastorage.userid;
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
