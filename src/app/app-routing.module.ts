import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'patient-signup',
    loadChildren: () => import('./patient-signup/patient-signup.module').then( m => m.PatientSignupPageModule)
  },
  {
    path: 'physician-signup',
    loadChildren: () => import('./physician-signup/physician-signup.module').then( m => m.PhysicianSignupPageModule)
  },
  {
    path: 'hospital-signup',
    loadChildren: () => import('./hospital-signup/hospital-signup.module').then( m => m.HospitalSignupPageModule)
  },
  {
    path: 'organization-signup',
    loadChildren: () => import('./organization-signup/organization-signup.module').then( m => m.OrganizationSignupPageModule)
  },
  {
    path: 'passcode',
    loadChildren: () => import('./passcode/passcode.module').then( m => m.PasscodePageModule)
  },
  {
    path: 'myaccount',
    loadChildren: () => import('./myaccount/myaccount.module').then( m => m.MyaccountPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'healthinfo/:id/:name/:mydate/:mydate2',
    loadChildren: () => import('./healthinfo/healthinfo.module').then( m => m.HealthinfoPageModule)
  },
  {
    path: 'healthadd/:id/:name',
    loadChildren: () => import('./healthadd/healthadd.module').then( m => m.HealthaddPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'healthrecord/:id/:name',
    loadChildren: () => import('./healthrecord/healthrecord.module').then( m => m.HealthrecordPageModule)
  },
  {
    path: 'healthupdate/:id/:name',
    loadChildren: () => import('./healthupdate/healthupdate.module').then( m => m.HealthupdatePageModule)
  },
  {
    path: 'partners/:area',
    loadChildren: () => import('./partners/partners.module').then( m => m.PartnersPageModule)
  },
  {
    path: 'book/:id',
    loadChildren: () => import('./book/book.module').then( m => m.BookPageModule)
  },
  {
    path: 'bookpatient/:id',
    loadChildren: () => import('./bookpatient/bookpatient.module').then( m => m.BookpatientPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'website',
    loadChildren: () => import('./website/website.module').then( m => m.WebsitePageModule)
  },
  {
    path: 'billpay',
    loadChildren: () => import('./billpay/billpay.module').then( m => m.BillpayPageModule)
  },
  {
    path: 'bill',
    loadChildren: () => import('./bill/bill.module').then( m => m.BillPageModule)
  },
  {
    path: 'biodata',
    loadChildren: () => import('./biodata/biodata.module').then( m => m.BiodataPageModule)
  },
  {
    path: 'ecard',
    loadChildren: () => import('./ecard/ecard.module').then( m => m.EcardPageModule)
  },
  {
    path: 'partnersearch/:id/:area',
    loadChildren: () => import('./partnersearch/partnersearch.module').then( m => m.PartnersearchPageModule)
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./qrcode/qrcode.module').then( m => m.QrcodePageModule)
  },
  {
    path: 'qrscan',
    loadChildren: () => import('./qrscan/qrscan.module').then( m => m.QrscanPageModule)
  },
  {
    path: 'birthcertadd/:id/:name',
    loadChildren: () => import('./birthcertadd/birthcertadd.module').then( m => m.BirthcertaddPageModule)
  },
  {
    path: 'birthcert',
    loadChildren: () => import('./birthcert/birthcert.module').then( m => m.BirthcertPageModule)
  },
  {
    path: 'deathcertadd/:id/:name',
    loadChildren: () => import('./deathcertadd/deathcertadd.module').then( m => m.DeathcertaddPageModule)
  },
  {
    path: 'deathcert',
    loadChildren: () => import('./deathcert/deathcert.module').then( m => m.DeathcertPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'resetcode',
    loadChildren: () => import('./resetcode/resetcode.module').then( m => m.ResetcodePageModule)
  },
  {
    path: 'resetpass/:id',
    loadChildren: () => import('./resetpass/resetpass.module').then( m => m.ResetpassPageModule)
  },
  {
    path: 'pdfweb',
    loadChildren: () => import('./pdfweb/pdfweb.module').then( m => m.PdfwebPageModule)
  },
  {
    path: 'nurse',
    loadChildren: () => import('./nurse/nurse.module').then( m => m.NursePageModule)
  },
  {
    path: 'chart/:id/:name',
    loadChildren: () => import('./chart/chart.module').then( m => m.ChartPageModule)
  },
  {
    path: 'tips',
    loadChildren: () => import('./tips/tips.module').then( m => m.TipsPageModule)
  },
  {
    path: 'profile2',
    loadChildren: () => import('./profile2/profile2.module').then( m => m.Profile2PageModule)
  },
  {
    path: 'biodata2/:id',
    loadChildren: () => import('./biodata2/biodata2.module').then( m => m.Biodata2PageModule)
  },
  {
    path: 'hrecord/:id/:name',
    loadChildren: () => import('./hrecord/hrecord.module').then( m => m.HrecordPageModule)
  },
  {
    path: 'online/:id',
    loadChildren: () => import('./online/online.module').then( m => m.OnlinePageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'fee',
    loadChildren: () => import('./fee/fee.module').then( m => m.FeePageModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then( m => m.AppointmentPageModule)
  },
  {
    path: 'hospital/:id',
    loadChildren: () => import('./hospital/hospital.module').then( m => m.HospitalPageModule)
  },
  {
    path: 'healthrecord2/:id/:hospid/:name',
    loadChildren: () => import('./healthrecord2/healthrecord2.module').then( m => m.Healthrecord2PageModule)
  },
  {
    path: 'reqrecord/:id/:hospid',
    loadChildren: () => import('./reqrecord/reqrecord.module').then( m => m.ReqrecordPageModule)
  },
  {
    path: 'appointrecord/:id/:hospid',
    loadChildren: () => import('./appointrecord/appointrecord.module').then( m => m.AppointrecordPageModule)
  },
  {
    path: 'labrecord/:id/:hospid',
    loadChildren: () => import('./labrecord/labrecord.module').then( m => m.LabrecordPageModule)
  },
  {
    path: 'hrecord2/:id/:hospid',
    loadChildren: () => import('./hrecord2/hrecord2.module').then( m => m.Hrecord2PageModule)
  },
  {
    path: 'area',
    loadChildren: () => import('./area/area.module').then( m => m.AreaPageModule)
  },
  {
    path: 'partners2',
    loadChildren: () => import('./partners2/partners2.module').then( m => m.Partners2PageModule)
  },
  {
    path: 'partnersearch2/:id',
    loadChildren: () => import('./partnersearch2/partnersearch2.module').then( m => m.Partnersearch2PageModule)
  },
  {
    path: 'invoice/:patientid/:partnerid/:amount/:currency/:request',
    loadChildren: () => import('./invoice/invoice.module').then( m => m.InvoicePageModule)
  },
  {
    path: 'reqrecord2/:id',
    loadChildren: () => import('./reqrecord2/reqrecord2.module').then( m => m.Reqrecord2PageModule)
  },
  {
    path: 'appointrecord2/:id',
    loadChildren: () => import('./appointrecord2/appointrecord2.module').then( m => m.Appointrecord2PageModule)
  },
  {
    path: 'review/:id/:name/:occupation',
    loadChildren: () => import('./review/review.module').then( m => m.ReviewPageModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('./patient/patient.module').then( m => m.PatientPageModule)
  },
  {
    path: 'feepage/:patientid/:partnerid/:name/:amount/:currency/:request',
    loadChildren: () => import('./feepage/feepage.module').then( m => m.FeepagePageModule)
  },
  {
    path: 'healthinfo2/:id/:hospid/:name/:mydate/:mydate2',
    loadChildren: () => import('./healthinfo2/healthinfo2.module').then( m => m.Healthinfo2PageModule)
  },
  {
    path: 'changefee',
    loadChildren: () => import('./changefee/changefee.module').then( m => m.ChangefeePageModule)
  },
  {
    path: 'privacypolicy',
    loadChildren: () => import('./privacypolicy/privacypolicy.module').then( m => m.PrivacypolicyPageModule)
  },
  {
    path: 'bank/:id',
    loadChildren: () => import('./bank/bank.module').then( m => m.BankPageModule)
  },
  {
    path: 'privacypolicy2',
    loadChildren: () => import('./privacypolicy2/privacypolicy2.module').then( m => m.Privacypolicy2PageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
