import { Injectable } from '@angular/core';
import { segUsuarioPerfil } from '../models/seg.UsuarioPerfil';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SegUsuarioPerfilService {

  constructor(private http:HttpClient) { }


  getUsuarioPerfil(): Observable<segUsuarioPerfil[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<segUsuarioPerfil[]>(`${environment.BASE_URL}UsuarioPerfil/0/0/0`);
  }
  createUsuarioPerfil(segUsuarioPerfil: segUsuarioPerfil): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(`${environment.BASE_URL}UsuarioPerfil/post`, JSON.stringify(segUsuarioPerfil), { headers: headers });
  }
  PutUsuarioPerfil(segUsuarioPerfil: segUsuarioPerfil): Observable<segUsuarioPerfil> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<segUsuarioPerfil>(`${environment.BASE_URL}UsuarioPerfil/Put`, JSON.stringify(segUsuarioPerfil), { headers: headers });
  }

  Deshabilitar(idUsuarioPerfil: number, regUpdateIdUsuario: number): Observable<any> {
    return this.http.delete(`${environment.BASE_URL}UsuarioPerfil/Deshabilitar/${idUsuarioPerfil}/${regUpdateIdUsuario}`);
  }


  // ConsultaFuncion(idModulo: number): Observable<any> {
  //   return this.http.get(`${environment.BASE_URL}UsuarioPerfil/${idModulo}`);
  // }



}
