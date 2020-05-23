import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
/**
 * user service class
 */
export class UserDataService {

    //usuarios: Usuario[] = [];

    constructor(private http: HttpClient) { }
        /* let user = {
            userId: 1, userName: "admin", password: "password", emailId: "admin@admin.com", birthDate: new Date('10/28/1992')
        };
        this.users.push(user); */
    

    /**
     * get user by user name and password
     * @param userName 
     * @param password 
     */
    /* getUserByUserNameAndPassword(userName: string, password: string): User {
        let user: User = null;
        this.users.forEach(element => {
            if (element.userName === userName && element.password === password) {
                user = element;
            }
        });
        return user;
    } */

    /**
     * add new user
     * @param UsuarioModel 
     */
    addUser(usuario: UsuarioModel): Observable<any> {
        let myHeader = new HttpHeaders();
        myHeader = myHeader.set("Content-Type", "application/json");
        let param: string = JSON.stringify(usuario)

        return this.http.post(
            "http://localhost:58795/api/user/InsertarUser",
            param,
            { headers: myHeader }
        )
    }
}