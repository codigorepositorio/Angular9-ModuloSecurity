import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoginService } from '../core/services/login.services';
import { LoginModel } from '../core/models/login.model';
import { MENSAJES } from '../shared/constants';
import { UserContextService } from '../core/services/user-context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginModel: LoginModel;
  usuario: string;
  loginUsuario: any;
  constructor(
    private messageService: MessageService,

    private loginService: LoginService,

    private userContextService: UserContextService,

    private router: Router,
  ) { }

  ngOnInit() {
    this.loginModel = new LoginModel();
  }

  onClickLogin() {
    // Colocar logica
    /*  this.messageService.add({severity:'success', summary: 'Sesión', detail:'Credenciales válidas'}); 
     this.messageService.add({severity:'error', summary: 'Sesión', detail:'Credenciales inválidas'});  */

    // if (this.loginModel.Cod_Usuario == " admin " && this.loginModel.Password == "admin") {
    //   this.loginModel.Cod_Usuario = "sistemas";
    //   this.loginModel.Password = "s1g32030";
    // }
    const usuarioRegister = {
      usuario: "admin",
      contrasena: "admin"
    }



    // localStorage.setItem(MENSAJES.valorToken, 'asdasdasd654646');
    // this.userContextService.setUser(this.loginModel);
    this.router.navigate(['/main/dashboard']);
    // tslint:disable-next-line:comment-format
    //this.routeStateService.add("Dashboard", '/main/dashboard', null, true);

  
  }

onLanguageChange($event) {
}

}
