import { Injectable } from '@angular/core';
import { Area } from '../models/area.';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) { }  
  
  getAreas():Observable<Area[]>
   {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.http.get<Area[]>(`${environment.url_api2}Areas/Get`);
  }

createArea(area:Area):Observable<any>{
    
 let headers = new HttpHeaders();
 headers = headers.set('Content-Type','application/json');
 return  this.http.post(`${environment.url_api2}Areas/Post`,JSON.stringify(area),{headers:headers});

}

PutArea(area:Area):Observable<Area>{
    
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type','application/json');
  //return  this.http.put<Area>(`${environment.url_api2}Areas/Put`,area);
  return  this.http.put<Area>(`${environment.url_api2}Areas/Put`,JSON.stringify(area),{headers:headers});

 }


 
 DeleteArea(id:number):Observable<any>{ 
  return  this.http.delete(`${environment.url_api2}Areas/Delete/`+id);
 }


}
