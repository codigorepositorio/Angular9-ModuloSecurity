import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Periodo } from '../models/periodo.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  constructor(private http: HttpClient) { }
  
  getPeriodos():Observable<Periodo[]>
   {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.http.get<Periodo[]>(`${environment.url_api2}Periodos/Get`);
  }

createPeriodos(periodo:Periodo):Observable<Periodo>{
    
 let headers = new HttpHeaders();
 headers = headers.set('Content-Type','application/json');
 return  this.http.post<Periodo>(`${environment.url_api2}Periodos/Post`,JSON.stringify(periodo),{headers:headers});

}

PutPeriodos(periodo:Periodo):Observable<Periodo>{
    
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type','application/json');
  //return  this.http.put<Area>(`${environment.url_api2}Areas/Put`,area);
  return  this.http.put<Periodo>(`${environment.url_api2}Periodos/Put`,JSON.stringify(periodo),{headers:headers});
}
}