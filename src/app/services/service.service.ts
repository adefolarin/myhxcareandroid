import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

 
  apiKey = 'AIzaSyCigpYGgD6oSf4PfKLXn1f_kT7ADo01ak0';
  //server: string = "http://192.168.43.160:8080/projects/myhxcarehosp/api/"; // default
  //server2: string = "http://192.168.43.160:8080/projects/myhxcarehosp/";


	//server: string = "http://localhost:8080/projects/myhxcarehosp/api/"; // default
  //server2: string = "http://localhost:8080/projects/myhxcarehosp/";

	server: string = "https://myhxcare.com/myhxcarehosp/api/"; // default
  server2: string = "https://myhxcare.com/myhxcarehosp/";

  constructor(public http : HttpClient) { }

       postData(body, file){
		   let headers = new HttpHeaders({ 
            'Content-Type': "application/json; charset=UTF-8" 
        });
		   let options = { 

            headers: headers

        }

        return this.http.post(this.server + file, JSON.stringify(body), options)
          .timeout(59000)
		  .map(res => res); 
	    }

	   saveDeviceToken(token) {  

          return this.http.get(this.server + '/saveToken.php?token='+token);

     }

     uploadFile(file: File): Observable<HttpEvent<{}>> {
      const formdata: FormData = new FormData();
      formdata.append('file', file);
      const req = new HttpRequest('POST', this.server+'photo-api.php', formdata, {
          reportProgress: true,
          responseType: 'text'
      });
    
      return this.http.request(req);
     }
}
