import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { segPerfil } from '../models/seg.Perfil';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SegPerfilService {

  constructor(private http: HttpClient) { }

  getPerfil(): Observable<segPerfil[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<segPerfil[]>(`${environment.BASE_URL}Perfiles/Get`);
  }
  createPerfil(segPerfil: segPerfil): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(`${environment.BASE_URL}Perfiles/post`, JSON.stringify(segPerfil), { headers: headers });
  }
  PutPerfil(segPerfil: segPerfil): Observable<segPerfil> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<segPerfil>(`${environment.BASE_URL}Perfiles/Put`, JSON.stringify(segPerfil), { headers: headers });
  }

  Deshabilitar(idPerfil: number, regUpdateIdUsuario: number): Observable<any> {
    return this.http.delete(`${environment.BASE_URL}Perfiles/Deshabilitar/${idPerfil}/${regUpdateIdUsuario}`);
  }


}