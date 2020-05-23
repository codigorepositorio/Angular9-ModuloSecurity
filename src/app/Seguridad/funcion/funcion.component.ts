import { Component, OnInit } from '@angular/core';
import { segFuncion } from 'src/app/core/models/seg.Funcion';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { SegFuncionService } from 'src/app/core/services/seg-funcion.service';
import { SegModuloService } from 'src/app/core/services/seg-modulo.service';
import { segModulo } from 'src/app/core/models/seg.Modulo';

@Component({
  selector: 'app-funcion',
  templateUrl: './funcion.component.html',

})
export class FuncionComponent implements OnInit {

  codigoModulo: number;
  segModulos: segModulo[];

  mensajeError: string = "";

  cantidaRegistros: number;
  segFuncions: segFuncion[];

  cols: any[];
  edicion: boolean = false;
  items: MenuItem[];
  displaySaveDialog: boolean = false;


  // 
  // test
  // 

  vperfilUsuario:boolean = false;

  model: segFuncion;

  segfuncion: segFuncion = {

    idFuncion: 0,
    idModulo: 0,
    nomFuncion: null,
    codAcceso: null,
    isFuncionActivo: null,

  };

  selectedFuncion: segFuncion = {
    idFuncion: 0,
    idModulo: 0,
    nomFuncion: null,
    codAcceso: null,
    isFuncionActivo: null,
  };

  titulo: string = "";

  constructor(
    private SegFuncionService: SegFuncionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private segModuloService: SegModuloService

  ) { }

  ngOnInit() {
    this.formatoTabla();
    this.getFuncion();
    this.getModulo();

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
        command: () => this.deleteFuncion()
      }
      ,
      {
        label: "Refresh",
        icon: 'fas fa-sync',
        command: () => this.getFuncion()
      }
    ]

    this.cols = [

      { field: "idFuncion", header: "ID" },
      { field: "nomFuncion", header: "Nombre" },
      { field: "codAcceso", header: "Código" },
      { field: "isFuncionActivo", header: "Activo" },
      { field: "regCreate", header: "Fecha Creación" },
      { field: "regCreateIdUsuario", header: "Usuario Creacion" },
      { field: "regUpdateIdUsuario", header: "Usuario Modificación" },
      { field: "regUpdate", header: "Fecha Modificación" }
    ];

  }

  getFuncion() {
    this.SegFuncionService.getFuncion().subscribe(

      (result: any) => {

        let segFuncions: segFuncion[] = [];

        for (let i = 0; i < result.length; i++) {
          let segFuncion = result[i] as segFuncion;
          segFuncions.push(segFuncion);
        }
        this.segFuncions = segFuncions
        this.cantidaRegistros = this.segFuncions.length;

        console.log(this.segFuncions);

      },
      error => {
        console.log(error);
      }
    )
  }

  moduloSeleccionado($event) {
    console.log($event.target.value);
    this.codigoModulo = $event.target.value;
  }


  saveFuncion() {

    console.log(this.codigoModulo);
    if (!this.edicion) {

      this.model = {
        idFuncion: 0,
        idModulo: Number(this.codigoModulo),
        nomFuncion: this.segfuncion.nomFuncion,
        codAcceso: this.segfuncion.codAcceso,
        isFuncionActivo: this.segfuncion.isFuncionActivo,

      };
      console.log(this.model);


      this.SegFuncionService.createFuncion(this.model).subscribe(

        (result: any) => {
          let segFuncion = result as segFuncion;
          this.validaFuncion(segFuncion)
          //this.segUsuarios.push(segUsuario);          
          this.displaySaveDialog = false;
          this.mensajeError = null;
          this.addSingle(segFuncion.idFuncion);
          console.log("Objeto creado: ", segFuncion);
          //this.getUsuario();
          this.clearCampos();
          this.cantidadRegistro();
        },
        error => {
          console.log(error);
          this.mensajeError = error.error;
          this.segfuncion.idFuncion
        }
      )
    }
    else {
      {

        this.segfuncion.idModulo = Number(this.codigoModulo),
          this.segfuncion.regUpdateIdUsuario = 4,

          this.SegFuncionService.PutFuncion(this.segfuncion).subscribe(
            (result: any) => {
              let segFuncion = result as segFuncion;
              this.validaFuncion(segFuncion)
              //this.segUsuarios.push(segUsuario);            
              this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se modifico la Funcion con ID: ' + this.selectedFuncion.idFuncion + ' correctamente.' });
              this.displaySaveDialog = false;
              console.log("usuarioS MODIFICADO", segFuncion)
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



  validaFuncion(segfuncion: segFuncion) {
    let index = this.segFuncions.findIndex((e) => e.idFuncion == segfuncion.idFuncion);
    if (index != -1) {
      this.segFuncions[index] = segfuncion
    } else {
      this.segFuncions.push(segfuncion)
    }
  }

  // 
  ShowSaveDialog(editar: boolean) {
    this.edicion = editar;
    if (editar) {
      if (this.selectedFuncion.idFuncion != null) {
        this.titulo = "Edición"

        this.segfuncion = this.selectedFuncion;

        console.log(this.selectedFuncion);
        this.codigoModulo = this.selectedFuncion.idModulo;
      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor Seleccione un registro.' });
        return;
      }

    } else {
      this.titulo = "Nuevo"
      //this.segmodulo = new segModulo();
      this.segfuncion.nomFuncion = null;
      this.segfuncion.isFuncionActivo = false;

    }
    this.mensajeError = null;
    this.displaySaveDialog = true;
  }




  deleteFuncion() {

    if (this.selectedFuncion == null || this.selectedFuncion.idFuncion == null) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor Seleccione un registro.' });
      return;
    }

    this.confirmationService.confirm({
      message: "¿Esta Seguro que desea eliminar el Registro?",
      accept: () => {

        this.SegFuncionService.Deshabilitar(this.selectedFuncion.idFuncion, this.selectedFuncion.regCreateIdUsuario).subscribe(
          (result: any) => {

            this.messageService.add({
              severity: 'success', summary: "Resultado", detail: "Se elimino la Función con Id: " + this.selectedFuncion.idFuncion + " Correctamente"
            })
            console.log("selectedFuncioin", this.selectedFuncion.idFuncion);
            this.deleteObject(this.selectedFuncion.idFuncion);
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

  deleteObject(idFuncion: number) {

    let index = this.segFuncions.findIndex((e) => e.idFuncion == idFuncion);
    //let estado = this.segModulos.findIndex((e) => e.isModuloActivo == activo);

    if (index != -1) {
      this.segFuncions.splice(index, 1);
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
    this.segfuncion.idModulo = 0;
    this.segfuncion.idFuncion = 0;
    this.segfuncion.nomFuncion = null;
    this.segfuncion.isFuncionActivo = false
  }


  cantidadRegistro() {
    this.cantidaRegistros = this.segFuncions.length;
  }

  // Carga Módulo

  getModulo() {

    this.segModuloService.getModulo().subscribe((response: segModulo[]) => {
      this.segModulos = response
    },
      error => console.error(error))
  }


  getPerfiles()
  {
    this.vperfilUsuario=true
  }
}


