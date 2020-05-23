import { Component, OnInit } from '@angular/core';
import { segPerfil } from 'src/app/core/models/seg.Perfil';
import { segUsuario } from 'src/app/core/models/seg.usuario';
import { segUsuarioPerfil } from 'src/app/core/models/seg.UsuarioPerfil';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { SegUsuarioService } from 'src/app/core/services/seg-usuario.service';
import { SegPerfilService } from 'src/app/core/services/seg-perfil.service';
import { SegUsuarioPerfilService } from 'src/app/core/services/seg-usuario-perfil.service';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html'
})

export class UsuarioPerfilComponent implements OnInit {

  codigoUsuario: number;
  codigoPerfil: number;

  segUsuarios: segUsuario[];
  segPerfiles: segPerfil[];



  mensajeError: string = "";

  cantidaRegistros: number;
  segUsuarioPerfiles: segUsuarioPerfil[];

  cols: any[];
  edicion: boolean = false;
  items: MenuItem[];
  displaySaveDialog: boolean = false;

  model: segUsuarioPerfil;

  segusuarioPerfil: segUsuarioPerfil = {
    idUsuarioPerfil: 0,
    idUsuario: 0,
    idPerfil: 0,
    isUsuarioPerfilActivo: true,
    isAccesoDirecto: null

  }

  selectedUsuarioPerfil: segUsuarioPerfil = {
    idUsuarioPerfil: 0,
    idUsuario: 0,
    idPerfil: 0,
    isUsuarioPerfilActivo: true,
    isAccesoDirecto: null
  }

  titulo: string = "";

  constructor(
    private segPerfilService: SegPerfilService,
    private segUsuarioService: SegUsuarioService,
    private segUsuarioPerfilService: SegUsuarioPerfilService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,



  ) { }

  ngOnInit() {

    this.getUsuarioPerfil();
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
        command: () => this.deleteUsuarioPerfil()
      }
      ,
      {
        label: "Refresh",
        icon: 'fas fa-sync',
        command: () => this.getUsuarioPerfil()
      }
    ]

    this.cols = [

      { field: "idUsuarioPerfil", header: "ID" },
      { field: "idUsuario", header: "Usuario" },
      { field: "idPerfil", header: "Perfil" },
      { field: "isUsuarioPerfilActivo", header: "Activo" },
      { field: "isAccesoDirecto", header: "Acceso Directo" },
      { field: "regCreate", header: "Usuario Creacion" },
      { field: "regCreateIdUsuario", header: "Usuario Modificación" },
      { field: "regUpdateIdUsuario", header: "Fecha Modificación" },
      { field: "regUpdate", header: "Fecha Modificación" }

    ];

  }

  getUsuarioPerfil() {
    this.segUsuarioPerfilService.getUsuarioPerfil().subscribe(

      (result: any) => {

        let segUsuarioPerfils: segUsuarioPerfil[] = [];

        for (let i = 0; i < result.length; i++) {
          let segUsuarioPerfil = result[i] as segUsuarioPerfil;
          segUsuarioPerfils.push(segUsuarioPerfil);
        }
        this.segUsuarioPerfiles = segUsuarioPerfils
        this.cantidaRegistros = this.segUsuarioPerfiles.length;

        console.log(this.segUsuarioPerfiles);

      },
      error => {
        console.log(error);
      }
    )
  }


  UsuqrioSeleccionado($event) {
    console.log($event.target.value);
    this.codigoUsuario = $event.target.value;
  }
  PerfilSeleccionado($event) {
    console.log($event.target.value);
    this.codigoPerfil = $event.target.value;
  }



  save() {

    console.log(this.codigoPerfil);
    console.log(this.codigoUsuario);


    if (!this.edicion) {

      this.model = {
        idUsuarioPerfil: 0,
        idUsuario: Number(this.codigoUsuario),
        idPerfil: Number(this.codigoPerfil),                
        isUsuarioPerfilActivo: this.segusuarioPerfil.isUsuarioPerfilActivo,
        regCreateIdUsuario: this.segusuarioPerfil.regCreateIdUsuario,
      };

      console.log(this.model);


      this.segUsuarioPerfilService.createUsuarioPerfil(this.model).subscribe(

        (result: any) => {
          let segUsuarioPerfil = result as segUsuarioPerfil;
          this.validaUsuarioPerfil(segUsuarioPerfil)
          //this.segUsuarios.push(segUsuario);          
          this.displaySaveDialog = false;
          this.mensajeError = null;
          this.addSingle(segUsuarioPerfil.idUsuarioPerfil);
          console.log("Objeto creado: ", segUsuarioPerfil);
          //this.getUsuario();
          this.clearCampos();
          this.cantidadRegistro();
        },
        error => {
          console.log(error);
          this.mensajeError = error.error;
          this.segusuarioPerfil.idUsuarioPerfil
        }
      )
    }
    else {
      {

         this.segusuarioPerfil.idUsuario = Number(this.codigoUsuario),
         this.segusuarioPerfil.idPerfil = Number(this.codigoPerfil),

          this.segusuarioPerfil.regUpdateIdUsuario = 4,

          this.segUsuarioPerfilService.PutUsuarioPerfil(this.segusuarioPerfil).subscribe(
            (result: any) => {
              let segUsuarioPerfil = result as segUsuarioPerfil;
              this.validaUsuarioPerfil(segUsuarioPerfil)
              //this.segUsuarios.push(segUsuario);            
              this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se modifico la Usuario-Perfil con ID: ' + this.selectedUsuarioPerfil.idUsuarioPerfil + ' correctamente.' });
              this.displaySaveDialog = false;
              console.log("usuarioS MODIFICADO", segUsuarioPerfil)
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


  
  validaUsuarioPerfil(segusuarioPerfil: segUsuarioPerfil) {
    let index = this.segUsuarioPerfiles.findIndex((e) => e.idUsuarioPerfil == segusuarioPerfil.idUsuarioPerfil);
    if (index != -1) {
      this.segUsuarioPerfiles[index] = segusuarioPerfil
    } else {
      this.segUsuarioPerfiles.push(segusuarioPerfil)
    }
  }


  ShowSaveDialog(editar: boolean) {
    this.edicion = editar;
    if (editar) {
      if (this.selectedUsuarioPerfil.idUsuarioPerfil != null) {
        this.titulo = "Edición"

        this.segusuarioPerfil = this.selectedUsuarioPerfil;

        console.log(this.selectedUsuarioPerfil);

        this.codigoUsuario = this.selectedUsuarioPerfil.idUsuario;
        this.codigoUsuario = this.selectedUsuarioPerfil.idPerfil;

      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor Seleccione un registro.' });
        return;
      }

    } else {
      this.titulo = "Nuevo"
      //this.segmodulo = new segModulo();
      this.segusuarioPerfil.idPerfil =null;
      this.segusuarioPerfil.idUsuario =null;
      this.segusuarioPerfil.isUsuarioPerfilActivo = true;

    }
    this.mensajeError = null;
    this.displaySaveDialog = true;
  }

  deleteUsuarioPerfil() {

    if (this.selectedUsuarioPerfil == null || this.selectedUsuarioPerfil.idUsuarioPerfil == null) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor Seleccione un registro.' });
      return;
    }

    this.confirmationService.confirm({
      message: "¿Esta Seguro que desea eliminar el Registro?",
      accept: () => {

        this.segUsuarioPerfilService.Deshabilitar(this.selectedUsuarioPerfil.idUsuarioPerfil, this.selectedUsuarioPerfil.regCreateIdUsuario).subscribe(
          (result: any) => {

            this.messageService.add({
              severity: 'success', summary: "Resultado", detail: "Se elimino el Perfil-Usuario con Id: " + this.selectedUsuarioPerfil.idUsuarioPerfil + " Correctamente"
            })
            console.log("selectedFuncioin", this.selectedUsuarioPerfil.idUsuarioPerfil);
            this.deleteObject(this.selectedUsuarioPerfil.idUsuarioPerfil);
            this.mensajeError = "";

            this.cantidadRegistro();
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

  deleteObject(idUsuarioPerfil: number) {

    let index = this.segUsuarioPerfiles.findIndex((e) => e.idUsuarioPerfil == idUsuarioPerfil);
    //let estado = this.segModulos.findIndex((e) => e.isModuloActivo == activo);

    if (index != -1) {
      this.segUsuarioPerfiles.splice(index, 1);
    }

    // if (!estado) {
    //   this.segModulos.splice(index, 1);
    // }


  }


  Cancelar() {
    if (!this.edicion) {
      this.clearCampos();
    }
    this.displaySaveDialog = false;
  }


  addSingle(id: number) {
    this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se creo la Función con ID: ' + id + ' correctamente.' });
  }

  clearCampos() {
    this.segusuarioPerfil.idUsuario = 0;
    this.segusuarioPerfil.idPerfil = 0;
    
    
  }

  cantidadRegistro() {
    this.cantidaRegistros = this.segUsuarioPerfiles.length;
  }



}//fin
