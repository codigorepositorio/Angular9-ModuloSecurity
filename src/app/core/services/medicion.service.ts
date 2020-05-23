import { Injectable } from '@angular/core';
import { Medicion } from '../models/medicion.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {
  FaseUno = [];
  FaseDos = [];
  FaseTres = [];
  FaseCuatro = [];
  FaseCinco = [];
  
  constructor(private http:HttpClient) { }


  getPreguntas():Observable<Medicion[]>
  {
    return this.http.get<Medicion[]>(`${environment.url_api2}Medicion/get`);
  }


  puntajePreguntas(medicion:Medicion)
  
  {
   return this.http.put<Medicion>(`${environment.url_api2}Medicion/puntaje`,medicion);
  }


  HabilitaPreguntas(id:number) {
    return this.http.put<any>(`${environment.url_api2}Preguntas/Habilitar`,id);
  }


}
