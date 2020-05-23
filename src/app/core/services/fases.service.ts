import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Fases } from '../models/Fases.model';

@Injectable({
  providedIn: 'root'
})
export class FasesService {

  constructor(private http:HttpClient) { }

  consultaFases() {
    return this.http.get<any>(`${environment.url_api2}Fases/Get`);  
    }
  
  }