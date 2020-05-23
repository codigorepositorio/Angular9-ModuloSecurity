import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Preguntas } from '../models/Preguntas.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(private http: HttpClient) { }


  getPreguntas():Observable<Preguntas[]>
  {
    return this.http.get<Preguntas[]>(`${environment.url_api2}Preguntas`);
  }

  // getPreguntas2():Observable<Preguntas[]>
  // {
  //   return this.http.get<Preguntas[]>(`${environment.url_api2}Preguntas/Get2`);
  // }

createPregunta(pregunta:Preguntas):Observable<Preguntas>{
    
 let headers = new HttpHeaders();
 headers = headers.set('Content-Type','application/json');
 return  this.http.post<Preguntas>(`${environment.url_api2}Preguntas/Post`,JSON.stringify(pregunta),{headers:headers});
}

  actualizaPreguntas(preguntas: Preguntas) {
    return this.http.put<Preguntas>(`${environment.url_api2}Preguntas/Put`,preguntas);
  }
  
  eliminaPreguntas(id:number) {
    return this.http.put<any>(`${environment.url_api2}Preguntas/Delete`,id);
  }

  HabilitaPreguntas(id:number) {
    return this.http.put<any>(`${environment.url_api2}Preguntas/Habilitar`,id);
  }

  getFases() {
    return this.http.get<any>(`${environment.url_api2}Fases/Get`);  
  }


}
