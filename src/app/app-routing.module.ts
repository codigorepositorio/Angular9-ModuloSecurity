import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminGuard } from './admin.guard';
import { AyudaComponent } from './ayuda/ayuda.component';
import { EvaluacionComponent } from './principal/evaluacion/evaluacion.component';
import { PreguntasComponent } from './Medicion/preguntas/preguntas.component'
import { AreasComponent } from './Medicion/areas/areas.component';
import { PeriodoComponent } from './Medicion/periodo/periodo.component';
import { CategoriaComponent } from './Medicion/categoria/categoria.component';
import { UsuarioComponent } from './Seguridad/usuario/usuario.component';
import { AplicativoComponent } from './Seguridad/aplicativo/aplicativo.component';
import { PerfilComponent } from './Seguridad/perfil/perfil.component';
import { ModuloComponent } from './Seguridad/modulo/modulo.component';
import { FuncionComponent } from './Seguridad/funcion/funcion.component';
import { UsuarioPerfilComponent } from './Seguridad/usuario-perfil/usuario-perfil.component';


const routes: Routes = [
  // { path: "dashboard", component: DashboardComponent },
  {
    path: "login",
    //component: LoginComponent
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule)
  },

  {
    path: "main",
    component: LayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then(m => m.DashboardModule)
        //canActivate: [AuthGuard]
      },

      {
        path: "evaluacion",
        // canActivate: [AdminGuard],
        component: EvaluacionComponent
      },
      {
        path: "preguntas",
        // canActivate: [AdminGuard],
        component: PreguntasComponent
      },
      {
        path: "areas",
        // canActivate: [AdminGuard],
        component: AreasComponent
      }
      ,
      {
        path: "periodos",
        // canActivate: [AdminGuard],
        component: PeriodoComponent
      },


      {
        path: "Usuarios",
        // canActivate: [AdminGuard],
        component: UsuarioComponent
      }
      ,
      {
        path: "Aplicativos",
        // canActivate: [AdminGuard],
        component: AplicativoComponent

      }
      ,
      {
        path: "Perfiles",
        // canActivate: [AdminGuard],
        component: PerfilComponent

      }
      ,
      {
        path: "Modulos",
        // canActivate: [AdminGuard],
        component: ModuloComponent

      }
      ,
      {
        path: "Funcion",
        // canActivate: [AdminGuard],
        component: FuncionComponent

      },
      {
        path: "UsuarioPerfil",
        // canActivate: [AdminGuard],
        component: UsuarioPerfilComponent
      }
      ,
    ]
  },

  {
    path: "**",
    redirectTo: "login",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }