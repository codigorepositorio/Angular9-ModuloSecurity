import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { segModulo } from '../models/seg.Modulo';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SegModuloService {

  constructor( private http:HttpClient) { }

  getModulo(): Observable<segModulo[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<segModulo[]>(`${environment.BASE_URL}Modulos/0`);
  }
  createModulo(segModulo: segModulo): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(`${environment.BASE_URL}Modulos/post`, JSON.stringify(segModulo), { headers: headers });
  }
  PutModulo(segModulo: segModulo): Observable<segModulo> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<segModulo>(`${environment.BASE_URL}Modulos/Put`, JSON.stringify(segModulo), { headers: headers });
  }

  Deshabilitar(idModulo: number, regUpdateIdUsuario: number): Observable<any> {
    return this.http.delete(`${environment.BASE_URL}Modulos/Deshabilitar/${idModulo}/${regUpdateIdUsuario}`);
  }

  ConsultaModulo(idAplicativo: number): Observable<any> {
    return this.http.get(`${environment.BASE_URL}Modulos/${idAplicativo}`);
  }








}
