import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SessionService } from './session.service';

const defaultUser = null;

@Injectable({
    providedIn: 'root'
})
export class UserContextService {
    public user$ = new BehaviorSubject(defaultUser);

    constructor(private sessionService: SessionService) {            
        var data = this.sessionService.getItem("currentUser");
        // console.log("dataaaaaaaaaa");
        // console.log(data);
        
        // var data = 'asdasdasdasdasdasdasd';
        if (data != null) {
            this.user$.next(data);
        }
    }

    public setUser(user: any) {    
        // console.log("Userrrrrrrrrrrrrrrr");
        // console.log(user);
        
        
        this.sessionService.setItem("currentUser", user);
        this.user$.next(user);
    }

    public logout() {
        this.sessionService.removeItem("currentUser");
        this.user$.next(defaultUser);
    }

}