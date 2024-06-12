import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Data} from '../app.types';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export default class AppService {
  constructor(private http: HttpClient){}

  getData():Observable<Data[]>{
    return this.http.get<Data[]> ('https://5eff8c0cdfd1400016ae1337.mockapi.io/api/v1/products/diagnosis');
  }

}


