import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * menu data service
 */
export class MenuDataService {
  getMenuList() {
    return [
      {
        Label: "Inicio",
        Icon: "fa-home",
        RouterLink: "/main/dashboard",
        Childs: null,
        IsChildVisible: false
      },
      {
        Label: "Medición",
        Icon: "fa-file-alt",
        RouterLink: "/main/evaluacion",
        Childs: null,
        IsChildVisible: false
      },
      {
        Label: "Usuario - Perfil",
        Icon: "fa-clipboard-list",
        RouterLink:"/main/UsuarioPerfil",
        Childs: null,
        IsChildVisible: false
      },


      {
        Label: "Ajustes",
        Icon: "fas fa-wrench",
        RouterLink: "/",
        Childs: [{
          Label: "Usuarios",
          Icon: "far fa-list-alt",
          RouterLink: "/main/Usuarios",
          Childs: null,
          IsChildVisible: false
        },

         {
          Label: "Aplicativos",
          Icon: "fas fa-server",
          RouterLink: "/main/Aplicativos",
          Childs: null,
          IsChildVisible: false
        }
          ,
          
        {
          Label: "Perfiles",
          Icon: "far fa-calendar-alt",
          RouterLink: "/main/Perfiles",
          Childs: null,
          IsChildVisible: false
        },

        {
          Label: "Modulos",
          Icon: "far fa-calendar-alt",
          RouterLink: "/main/Modulos",
          Childs: null,
          IsChildVisible: false
        },
        
        {
          Label: "Funcion",
          Icon: "far fa-calendar-alt",
          RouterLink: "/main/Funcion",
          Childs: null,
          IsChildVisible: false
        },
        
        ],

        IsChildVisible: false
      },

      // {
      //   Label: "Búsqueda",
      //   Icon: "fa-search",
      //   RouterLink: "",
      //   Childs: [{
      //     Label: "Evaluación",
      //     Icon: "fa-search",
      //     RouterLink: "/main/evaluacion",
      //     Childs: null,
      //     IsChildVisible: false
      //   }],
      //   IsChildVisible: false
      // },
    ];
  }
}