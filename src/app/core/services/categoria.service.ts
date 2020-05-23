import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria } from '../models/categoria.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  getCategorias():Observable<Categoria[]>
   {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.http.get<Categoria[]>(`${environment.url_api2}Categorias/Get`);
  }

createCategoria(categoria:Categoria):Observable<any>{
    
 let headers = new HttpHeaders();
 headers = headers.set('Content-Type','application/json');
 return  this.http.post(`${environment.url_api2}Categorias/Post`,JSON.stringify(categoria),{headers:headers});

}

PutCategoria(categoria:Categoria):Observable<Categoria>{    
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type','application/json');
  return  this.http.put<Categoria>(`${environment.url_api2}Categorias/Put`,JSON.stringify(categoria),{headers:headers});


 }

 
 DeleteCategoria(id:number):Observable<any>{ 
  return  this.http.delete(`${environment.url_api2}Categorias/Delete/`+id);
 }
}
