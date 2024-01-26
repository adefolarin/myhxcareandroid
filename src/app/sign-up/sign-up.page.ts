import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private router: Router, 
    private navCtrl: NavController,
    private accessserv: ServiceService,
    private storage: Storage,
    private storage2: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  signUpPatient() {
    this.router.navigate(['/patient-signup']);
  }

  signUpPhysician() {
    this.router.navigate(['/physician-signup']);
  }

  signUpNurse() {
    this.router.navigate(['/nurse']);
  }

  signUpHospital() {
    this.router.navigate(['/hospital-signup']);
  }

  signUpOrganization() {
    this.router.navigate(['/organization-signup']);
  }

}
