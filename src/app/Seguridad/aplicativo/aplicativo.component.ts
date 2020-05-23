import { Component, OnInit } from '@angular/core';
import { segAplicativo } from 'src/app/core/models/seg.Aplicativo';
import { MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { SegAplicativoService } from 'src/app/core/services/seg-aplicativo.service';
import { SegModuloService } from 'src/app/core/services/seg-modulo.service';
import { segModulo } from 'src/app/core/models/seg.Modulo';
import { SegFuncionService } from 'src/app/core/services/seg-funcion.service';
import { segFuncion } from 'src/app/core/models/seg.Funcion';
@Component({
  selector: 'app-aplicativo',
  templateUrl: './aplicativo.component.html',

})
export class AplicativoComponent implements OnInit {


  segFuncions: segFuncion[];



  // 
  selectedModulo: segModulo = {
    idModulo: null,
    idAplicativo: null,
    nomModulo: null,
    isModuloActivo: null,
  };
  // 


  mensajeError: string = "";
  cantidaRegistros: number;

  segAplicativos: segAplicativo[];

  cols: any[];

  colsModulo: any[];
  colsFuncion: any[];
  edicion: boolean = false;
  items: MenuItem[];

  //Inicio: Variables Agregar Nuevo preguntas
  displaySaveDialog: boolean = false;

  segaplicativo: segAplicativo = {

    idAplicativo: 1
    , codAplicativo: null
    , nomAplicativo: null
    , isAplicativoActivo: false
  };

  selectedAplicativo: segAplicativo = {
    idAplicativo: null
    , codAplicativo: null
    , nomAplicativo: null
    , isAplicativoActivo: false
  };
  titulo: string = "";

  // Modulo



  segModulos: segModulo[];
  constructor(
    private segAplicativoService: SegAplicativoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private segModuloService: SegModuloService,
    private SegFuncionService: SegFuncionService,

  ) { }

  ngOnInit() {


    this.getAplicativo();
    this.formatoTabla();
    this.TablaFuncion();

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
        command: () => this.deleteAplicativo()
      }
      ,
      {
        label: "Refresh",
        icon: 'fas fa-sync',
        command: () => this.getAplicativo()
      }

    ]

    this.cols = [
      { field: "idAplicativo", header: "ID" },
      { field: "codAplicativo", header: "Código" },
      { field: "nomAplicativo", header: "Nombre" },
      { field: "isAplicativoActivo", header: "Activo" }
    ];

    this.colsModulo = [

      { field: "idModulo", header: "ID" },
      { field: "nomModulo", header: "Nombre" },
      { field: "isModuloActivo", header: "Activo" },
      { field: "regCreate", header: "Fecha Creación" },
      { field: "regCreateIdUsuario", header: "USuario Creacion" },
      { field: "regUpdate", header: "Fecha Modificación" },
      { field: "regUpdateIdUsuario", header: "Usuario Modificación" },


    ];

  }

  getAplicativo() {
    this.segAplicativoService.getAplicativo().subscribe(

      (result: any) => {

        let segAplicativos: segAplicativo[] = [];

        for (let i = 0; i < result.length; i++) {
          let segAplicativo = result[i] as segAplicativo;
          segAplicativos.push(segAplicativo);
        }
        this.segAplicativos = segAplicativos

        this.cantidaRegistros = this.segAplicativos.length;


      },
      error => {
        console.log(error);
      }
    )
  }


  saveAplicativo() {

    if (!this.edicion) {
      this.segAplicativoService.createAplicativo(this.segaplicativo).subscribe(
        (result: any) => {
          let segAplicativo = result as segAplicativo;

          this.validaAplicativo(segAplicativo)

          //this.segUsuarios.push(segUsuario);          

          this.displaySaveDialog = false;
          this.mensajeError = null;
          this.addSingle(segAplicativo.idAplicativo);
          console.log("Objeto creado: ", segAplicativo);
          //this.getUsuario();

          this.clearCampos();
          this.cantidadRegistro();
        },
        error => {
          console.log(error);
          this.mensajeError = error.error;
        }
      )
    }
    else {
      {
        this.segAplicativoService.PutAplicativo(this.segaplicativo).subscribe(
          (result: any) => {
            let segAplicativo = result as segAplicativo;
            this.validaAplicativo(segAplicativo)
            //this.segUsuarios.push(segUsuario);            
            this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se modifico el Aplicativo con ID: ' + this.selectedAplicativo.idAplicativo + ' correctamente.' });
            this.displaySaveDialog = false;
            console.log("usuarioS MODIFICADO", segAplicativo)
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


  validaAplicativo(segaplicativo: segAplicativo) {


    let index = this.segAplicativos.findIndex((e) => e.idAplicativo == segaplicativo.idAplicativo);
    if (index != -1) {
      this.segAplicativos[index] = segaplicativo
    } else {
      this.segAplicativos.push(segaplicativo)
    }

  }


  ShowSaveDialog(editar: boolean) {
    this.edicion = editar;
    if (editar) {
      if (this.selectedAplicativo.idAplicativo != null) {
        this.titulo = "Edición"
        this.segaplicativo = this.selectedAplicativo;

      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor Seleccione un registro.' });
        return;
      }

    } else {
      this.titulo = "Nuevo"
      this.segaplicativo = new segAplicativo();
    }
    this.mensajeError = null;
    this.displaySaveDialog = true;


  }

  deleteAplicativo() {

    if (this.selectedAplicativo == null || this.selectedAplicativo.idAplicativo == null) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor Seleccione un registro.' });
      return;
    }

    this.confirmationService.confirm({
      message: "¿Esta Seguro que desea eliminar el Registro?",
      accept: () => {

        this.segAplicativoService.Deshabilitar(this.segaplicativo).subscribe(
          (result: any) => {

            this.messageService.add({
              severity: 'success', summary: "Resultado", detail: "Se elimino el Aplicatico con Id: " + this.selectedAplicativo.idAplicativo + " Correctamente"
            })
            console.log("selectIdAplicativo", this.selectedAplicativo.idAplicativo);
            this.deleteObject(this.selectedAplicativo.idAplicativo);
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

  deleteObject(idAplicativo: number) {

    let index = this.segAplicativos.findIndex((e) => e.idAplicativo == idAplicativo);
    if (index != -1) {
      this.segAplicativos.splice(index, 1);
    }
  }


  Cancelar() {
    if (!this.edicion) {
      this.clearCampos();
    }
    this.displaySaveDialog = false;
  }


  addSingle(id: number) {
    this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se creo el Aplicativo con ID: ' + id + ' correctamente.' });
  }

  clearCampos() {
    this.segaplicativo.idAplicativo = 0;
    this.segaplicativo.codAplicativo = null;
    this.segaplicativo.nomAplicativo = null;
    this.segaplicativo.isAplicativoActivo = false;

  }

  cantidadRegistro() {
    this.cantidaRegistros = this.segAplicativos.length;
  }




  // ConsultaModulo
  getModulo() {

    this.segModuloService.ConsultaModulo(this.selectedAplicativo.idAplicativo).subscribe(

      (result: any) => {

        let segModulos: segModulo[] = [];

        for (let i = 0; i < result.length; i++) {
          let segModulo = result[i] as segModulo;
          segModulos.push(segModulo);
        }

        this.segModulos = segModulos
        this.cantidaRegistros = this.segModulos.length;

        console.log(this.segModulos);

      },
      error => {
        console.log(error);
      }
    )
  }


  getFuncion() {
    this.SegFuncionService.ConsultaFuncion(this.selectedModulo.idModulo).subscribe(

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


  TablaFuncion() {
    this.colsFuncion = [

      { field: "idFuncion", header: "ID" },
      { field: "nomFuncion", header: "Nombre" },
      { field: "codAcceso", header: "Código" },
      { field: "isFuncionActivo", header: "Activo" },
      { field: "regCreate", header: "Fecha Creación" },
      { field: "regCreateIdUsuario", header: "Usuario Creacion" },
      { field: "regUpdate", header: "Fecha Modificación" },
      { field: "regUpdateIdUsuario", header: "Usuario Modificación" },

    ];
  }


}
