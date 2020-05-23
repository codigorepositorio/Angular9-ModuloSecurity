import { Component, OnInit } from '@angular/core';
import { SegModuloService } from 'src/app/core/services/seg-modulo.service';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { segModulo } from 'src/app/core/models/seg.Modulo';
import { SelectItem } from 'primeng/api';
import { SegAplicativoService } from 'src/app/core/services/seg-aplicativo.service';
import { segAplicativo } from 'src/app/core/models/seg.Aplicativo';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html'
  
})
export class ModuloComponent implements OnInit {

  constructor(
    private segModuloService: SegModuloService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private segAplicativoService: SegAplicativoService,
  ) { }

  // Variable para obterner el Código de Aplicativo

  codigoAplicativo: number;

  mensajeError: string = "";

  cantidaRegistros: number;
  segModulos: segModulo[];

  cols: any[];
  edicion: boolean = false;
  items: MenuItem[];

  segAplicativos: segAplicativo[];
  //Inicio: Variables Agregar Nuevo preguntas
  displaySaveDialog: boolean = false;


  model: segModulo;

  segmodulo: segModulo = {
     idModulo: 0,
     idAplicativo: 0,
     nomModulo: null,
     isModuloActivo: null,
    
  };

  selectedModulo: segModulo = {
    idModulo: null,
    idAplicativo: null,
    nomModulo: null,
    isModuloActivo: null,    
  };

  titulo: string = "";

  ngOnInit() {

    this.getModulo();
    this.formatoTabla();
    this.getAplicativo();
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
        command: () => this.deleteModulo()
      }
      ,
      {
        label: "Refresh",
        icon: 'fas fa-sync',
        command: () => this.getModulo()
      }
    ]

    this.cols = [

      { field: "idModulo", header: "ID" },
      { field: "nomModulo", header: "Nombre" },
      { field: "idAplicativo", header: "idAplicativo" },
      { field: "isModuloActivo", header: "Activo" },
      { field: "regCreate", header: "Fecha Creación"},
      { field: "regCreateIdUsuario", header: "Usuario Creacion" },
      { field: "regUpdate", header: "Fecha Modificación" },
      { field: "regUpdateIdUsuario", header: "Usuario Modificación" },

    ];

  }

  getModulo() {
    this.segModuloService.getModulo().subscribe(

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


  aplicativoSeleccionado($event) {
    console.log($event.target.value);
    this.codigoAplicativo = $event.target.value;
  }

  //   ChangePaxType($event, dd: Dropdown){
  //     console.log(dd.selectedOption.label) // this is your selected item label
  //     console.log(dd.selectedOption.value.idAplicativo)// this is your selected item label
  //     this.codigoAplicativo=dd.selectedOption.value.idAplicativo
  //  }


  saveModulo() {

    console.log(this.codigoAplicativo);
    if (!this.edicion) {

      this.model = {
        idModulo: 0,      
        idAplicativo: Number(this.codigoAplicativo),
        nomModulo: this.segmodulo.nomModulo,
        isModuloActivo: this.segmodulo.isModuloActivo,
      };
      console.log(this.model);


      this.segModuloService.createModulo(this.model).subscribe(

        (result: any) => {
          let segModulo = result as segModulo;
          this.validaModulo(segModulo)
          //this.segUsuarios.push(segUsuario);          
          this.displaySaveDialog = false;
          this.mensajeError = null;
          this.addSingle(segModulo.idModulo);
          console.log("Objeto creado: ", segModulo);
          //this.getUsuario();
          this.clearCampos();
          this.cantidadRegistro();
        },
        error => {
          console.log(error);
          this.mensajeError = error.error;
          this.segmodulo.idAplicativo
        }
      )
    }
    else {
      {

        this.segmodulo.idAplicativo = Number(this.codigoAplicativo),
        
        this.segmodulo.regUpdateIdUsuario=4,

          this.segModuloService.PutModulo(this.segmodulo).subscribe(
            (result: any) => {
              let segModulo = result as segModulo;
              this.validaModulo(segModulo)
              //this.segUsuarios.push(segUsuario);            
              this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se modifico el Modulo con ID: ' + this.selectedModulo.idModulo + ' correctamente.' });
              this.displaySaveDialog = false;
              console.log("usuarioS MODIFICADO", segModulo)
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

  validaModulo(segmodulo: segModulo) {
    let index = this.segModulos.findIndex((e) => e.idModulo == segmodulo.idModulo);
    if (index != -1) {
      this.segModulos[index] = segmodulo
    } else {
      this.segModulos.push(segmodulo)
    }
  }

  // 
  ShowSaveDialog(editar: boolean) {
    this.edicion = editar;
    if (editar) {
      if (this.selectedModulo.idModulo != null) {
        this.titulo = "Edición"

        this.segmodulo = this.selectedModulo;

        console.log(this.selectedModulo);


        this.codigoAplicativo = this.selectedModulo.idAplicativo;
      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor Seleccione un registro.' });
        return;
      }

    } else {
      this.titulo = "Nuevo"
      //this.segmodulo = new segModulo();
      this.segmodulo.nomModulo = null;
      this.segmodulo.isModuloActivo = false;

    }
    this.mensajeError = null;
    this.displaySaveDialog = true;
  }

  deleteModulo() {

    if (this.selectedModulo == null || this.selectedModulo.idModulo == null) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor Seleccione un registro.' });
      return;
    }

    this.confirmationService.confirm({
      message: "¿Esta Seguro que desea eliminar el Registro?",
      accept: () => {

        this.segModuloService.Deshabilitar(this.selectedModulo.idModulo, this.selectedModulo.regCreateIdUsuario).subscribe(
          (result: any) => {

            this.messageService.add({
              severity: 'success', summary: "Resultado", detail: "Se elimino el Modulo con Id: " + this.selectedModulo.idModulo + " Correctamente"
            })
            console.log("selectedModulo", this.selectedModulo.idModulo);
            this.deleteObject(this.selectedModulo.idModulo);
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

  deleteObject(idModulo: number) {

    let index = this.segModulos.findIndex((e) => e.idModulo == idModulo);
    //let estado = this.segModulos.findIndex((e) => e.isModuloActivo == activo);

    if (index != -1) {
      this.segModulos.splice(index, 1);
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
    this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se creo el Modulo con ID: ' + id + ' correctamente.' });
  }

  clearCampos() {
    this.segmodulo.idModulo = 0;
    this.segmodulo.idAplicativo = 0;
    this.segmodulo.nomModulo = null;
    this.segmodulo.isModuloActivo = false
  }

  cantidadRegistro() {
    this.cantidaRegistros = this.segModulos.length;
  }


  // getAplicativo

  getAplicativo() {

    this.segAplicativoService.getAplicativo().subscribe((response: segAplicativo[]) => {
      this.segAplicativos = response
    },
      error => console.error(error))
  }

}


