import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Platform, NavController, ToastController, LoadingController, AlertController, IonSlides, BooleanValueAccessor } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { ServiceService } from '../services/service.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { partition } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {


  constructor() { }

  ngOnInit() {
     
  }

}
