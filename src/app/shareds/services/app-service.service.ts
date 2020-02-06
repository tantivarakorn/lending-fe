import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {


  constructor(private http: HttpClient) { }

   setheader() {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  get(url: string, params?) {
    return this.http.get(environment.address + url, { params: params, headers: this.setheader() });
  }

  post(url: string, data: any) {
    return this.http.post(environment.address + url, data, { headers: this.setheader() });
  }



}
