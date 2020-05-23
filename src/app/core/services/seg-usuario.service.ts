import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { segUsuario } from '../models/seg.usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SegUsuarioService {
 
  constructor(private http:HttpClient) { }
 
  getUsuarios():Observable<segUsuario[]>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.http.get<segUsuario[]>(`${environment.BASE_URL}Usuarios/Get`);
  }



  createUsuario(segUsuario:segUsuario):Observable<any>{
    
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return  this.http.post(`${environment.BASE_URL}Usuarios/Post`,JSON.stringify(segUsuario),{headers:headers});
   
   }
   
   PutUsuario(segUsuario:segUsuario):Observable<segUsuario>{
       
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type','application/json');
     //return  this.http.put<Area>(`${environment.url_api2}Areas/Put`,area);
     return  this.http.put<segUsuario>(`${environment.BASE_URL}Usuarios/Put`,JSON.stringify(segUsuario),{headers:headers});
   
    }
   


    PutDeshabilitar(segUsuario:segUsuario):Observable<segUsuario>{
       
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type','application/json');
      return  this.http.put<segUsuario>(`${environment.BASE_URL}Usuarios/Deshabilitar`,JSON.stringify(segUsuario),{headers:headers});
    
     }
   
    
    // DeshabilitarUsuario(id:number):Observable<any>{ 
    //  return  this.http.delete(`${environment.url_api2}Areas/Deshabilitar/`+id);
    // }



}
