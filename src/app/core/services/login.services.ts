import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { environment } from 'src/environments/environment';

//import { AutenticaGuard } from '../shared/guards/autentica.guard';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    constructor(private http: HttpClient) { }

    autentica(login: LoginModel): Observable<any> {
        let myHeader = new HttpHeaders();

        myHeader = myHeader.set("Content-Type", "application/json");

        let param: string = JSON.stringify(login)

        return this.http.post(
            `${environment.url_api}/Usuario/Autenticar`,
            param,
            { headers: myHeader }
        );

    }
}
