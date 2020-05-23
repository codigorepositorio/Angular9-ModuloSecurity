import { Component, OnInit } from '@angular/core';
import { SegUsuarioService } from 'src/app/core/services/seg-usuario.service';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { segUsuario } from 'src/app/core/models/seg.usuario';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  
})
export class UsuarioComponent implements OnInit {
  mensajeError: string = "";
  cantidaRegistros: number;

  segUsuarios: segUsuario[];

  cols: any[];
  edicion: boolean = false;
  items: MenuItem[];

  //Inicio: Variables Agregar Nuevo preguntas
  displaySaveDialog: boolean = false;

  segusuario: segUsuario = {

    idUsuario: 1
    , login: null
    , password: null
    , nombres: null
    , apellidoPaterno: null
    , apellidoMaterno: null
    , correoElectronico: null
    , isUsuarioActivo: false
    , isCambioPassword: false

  };

  selectedUsuario: segUsuario = {
    idUsuario: null
    , login: null
    , password: null
    , nombres: null
    , apellidoPaterno: null
    , apellidoMaterno: null
    , correoElectronico: null
    , isUsuarioActivo: false
    , isCambioPassword: false
  };
  titulo: string = "";


  constructor(
    private segUsuarioService: SegUsuarioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService

  ) { }

  ngOnInit() {

    this.getUsuario();
    this.formatoTabla();


  }

  formatoTabla() {
    this.items = [
      {
        label: "Nuevo",
        icon: 'pi pi-fw pi-plus',
        command: () => this.ShowSaveDialog(false)
      },
      {
        label: "Editar",
        icon: 'pi pi-fw pi-pencil',
        command: () => this.ShowSaveDialog(true)
      }
      ,
      {
        label: "Eliminar",
        icon: 'fas fa-times',
        command: () => this.deleteArea()
      },
      {
        label: "Perfiles",
        icon: 'fas fa-times',
        command: () =>this.ShowSaveDialog(false)
      }
    ]

    this.cols = [
      { field: "idUsuario", header: "ID" },
      { field: "login", header: "Login" },
      { field: "password", header: "Password" },
      { field: "nombres", header: "Nombres" },
      { field: "apellidoPaterno", header: "ApellidoPaterno" },
      { field: "apellidoMaterno", header: "ApellidoMaterno" },
      { field: "correoElectronico", header: "Email" },
      { field: "isCambioPassword", header: "CambioPassword" },
      { field: "isUsuarioActivo", header: "Estado" },

    ];
  }

  getUsuario() {
    this.segUsuarioService.getUsuarios().subscribe(

      (result: any) => {

        let segUsuarios: segUsuario[] = [];

        for (let i = 0; i < result.length; i++) {
          let segUsuario = result[i] as segUsuario;
          segUsuarios.push(segUsuario);
        }
        this.segUsuarios = segUsuarios
        this.cantidaRegistros = this.segUsuarios.length;

        console.log(this.segUsuarios);

      },
      error => {
        console.log(error);
      }
    )
  }



  saveUsuario() {

    if (!this.edicion) {
      this.segUsuarioService.createUsuario(this.segusuario).subscribe(
        (result: any) => {
          let segUsuario = result as segUsuario;

          this.validaUsuario(segUsuario)

          //this.segUsuarios.push(segUsuario);          

          this.displaySaveDialog = false;
          this.mensajeError = null;
          this.addSingle(segUsuario.idUsuario);
          console.log("Objeto creado: ", segUsuario);
          //this.getUsuario();
          
          this.clearCampos();

        },
        error => {
          console.log(error);
          this.mensajeError = error.error;
        }
      )
    }
    else {
      {
        this.segUsuarioService.PutUsuario(this.segusuario).subscribe(
          (result: any) => {
            let segUsuario = result as segUsuario;
            this.validaUsuario(segUsuario)
            //this.segUsuarios.push(segUsuario);            
            this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se modifico el Usuario con ID: '+ this.selectedUsuario.idUsuario +' correctamente.' });
            this.displaySaveDialog = false;            
            console.log("usuarioS MODIFICADO", segUsuario)
            return
          },
          error => {
            console.log(error);
            this.mensajeError = error.error;
          }
        )
      }
    }

  }

validaUsuario(segusuario:segUsuario){


  let index = this.segUsuarios.findIndex((e) => e.idUsuario == segusuario.idUsuario);
  if (index != -1)
  {
    this.segUsuarios[index] = segusuario
  } else{
    this.segUsuarios.push(segusuario)
  }

}



  ShowSaveDialog(editar: boolean) {
    this.edicion = editar;
    if (editar) {
      if (this.selectedUsuario.idUsuario != null) {
        this.titulo = "Edición"
        this.segusuario = this.selectedUsuario;

      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor Seleccione un registro.' });
        return;
      }

    } else {
      this.titulo = "Nuevo"
      this.segusuario = new segUsuario();
    }
    this.mensajeError = null;
    this.displaySaveDialog = true;


  }


  deleteArea() {

    if (this.selectedUsuario == null || this.selectedUsuario.idUsuario == null) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor Seleccione un registro.' });
      return;
    }

    this.confirmationService.confirm({
      message: "¿Esta Seguro que desea eliminar el Registro?",
      accept: () => {

        this.segUsuarioService.PutDeshabilitar(this.segusuario).subscribe(
          (result: any) => {

            this.messageService.add({
              severity: 'success', summary: "Resultado", detail: "Se elimino el usuario con Id: " + this.selectedUsuario.idUsuario + " Correctamente"
            })
            console.log("selectIdArea", this.selectedUsuario.idUsuario);
            this.deleteObject(this.selectedUsuario.idUsuario);
            this.mensajeError = "";
            this.cantidaRegistros = this.segUsuarios.length;

            this.clearCampos();
          }
          ,
          err => {
            console.log(err);
            // console.log(err.error);
            this.mensajeError = err.error;
          }
        )
      }
    })


  }

  deleteObject(idUsuario: number) {

    let index = this.segUsuarios.findIndex((e) => e.idUsuario == idUsuario);
    if (index != -1) {
      this.segUsuarios.splice(index, 1);
    }

    // console.log(this.areas);
    // let idFiltrar = idArea;
    // let obtenerArray = this.areas.find(element => element.idArea == idFiltrar);
    // let indiceBorrar = this.areas.indexOf(obtenerArray);
    // this.areas.splice(indiceBorrar, 1);
    // console.log(this.areas);
  }

  Cancelar() {
    if(!this.edicion)
    {
      this.clearCampos();
    }    
    this.displaySaveDialog = false;    
  }

  addSingle(id:number) {
    this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se creo el Usuario con ID: '+ id +' correctamente.' });
  }


  clearCampos() {
    this.segusuario.idUsuario = 0;
    this.segusuario.login = null;
    this.segusuario.password = null;
    this.segusuario.nombres = null;
    this.segusuario.apellidoPaterno = null;
    this.segusuario.apellidoMaterno = null;
    this.segusuario.correoElectronico = null;
    this.segusuario.isCambioPassword = false;
    this.segusuario.isUsuarioActivo = false;

  }



}

