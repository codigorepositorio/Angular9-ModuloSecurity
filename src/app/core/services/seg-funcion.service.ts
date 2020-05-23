import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { segFuncion } from '../models/seg.Funcion';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SegFuncionService {


 constructor( private http:HttpClient) { }

  getFuncion(): Observable<segFuncion[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<segFuncion[]>(`${environment.BASE_URL}Funcions/0`);
  }
  createFuncion(segFuncion: segFuncion): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(`${environment.BASE_URL}Funcions/post`, JSON.stringify(segFuncion), { headers: headers });
  }
  PutFuncion(segFuncion: segFuncion): Observable<segFuncion> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<segFuncion>(`${environment.BASE_URL}Funcions/Put`, JSON.stringify(segFuncion), { headers: headers });
  }

  Deshabilitar(idFuncion: number, regUpdateIdUsuario: number): Observable<any> {
    return this.http.delete(`${environment.BASE_URL}Funcions/Deshabilitar/${idFuncion}/${regUpdateIdUsuario}`);
  }

  ConsultaFuncion(idModulo: number): Observable<any> {
    return this.http.get(`${environment.BASE_URL}Funcions/${idModulo}`);
  }



}
