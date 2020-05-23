import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { segAplicativo } from '../models/seg.Aplicativo';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SegAplicativoService {

  constructor(private http:HttpClient) { }

  getAplicativo():Observable<segAplicativo[]>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.http.get<segAplicativo[]>(`${environment.BASE_URL}Aplicativos/Get`);
  }

  createAplicativo(segAplicativo:segAplicativo):Observable<any>{    
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return  this.http.post(`${environment.BASE_URL}Aplicativos/Post`,JSON.stringify(segAplicativo),{headers:headers});   
   }
   
   PutAplicativo(segAplicativo:segAplicativo):Observable<segAplicativo>{
       
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type','application/json');
     //return  this.http.put<Area>(`${environment.url_api2}Areas/Put`,area);
     return  this.http.put<segAplicativo>(`${environment.BASE_URL}Aplicativos/Put`,JSON.stringify(segAplicativo),{headers:headers});
   
    }   

    Deshabilitar(segAplicativo:segAplicativo):Observable<segAplicativo>{
       
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type','application/json');
      return  this.http.put<segAplicativo>(`${environment.BASE_URL}Aplicativos/Deshabilitar`,JSON.stringify(segAplicativo),{headers:headers});
    
     }


    
}
