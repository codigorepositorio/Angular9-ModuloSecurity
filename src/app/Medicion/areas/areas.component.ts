import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/core/models/area.';
import { AreaService } from 'src/app/core/services/area.service';
import { MenuItem, MessageService, ConfirmationService, Message } from 'primeng/api';
import { LoginComponent } from 'src/app/login/login.component';


@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})

export class AreasComponent implements OnInit {
  
  mensajeError: string = "";
  cantidaRegistros: number;
  areas: Area[];
  cols: any[];
  edicion: boolean = false;
  items: MenuItem[];
  msgs: Message[] = [];
  //Inicio: Variables Agregar Nuevo preguntas
  displaySaveDialog: boolean = false;

  area: Area = {
    idArea: 0, nombre: null, descripcion: null
  };

  selectedArea: Area = {
    idArea: null, nombre: null, descripcion: null
  }
  titulo:string="";

  constructor(
    private areaService: AreaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.getArea();

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
      }
    ]

    this.cols = [
      { field: "idArea", header: "ID" },
      { field: "nombre", header: "Nombre" },
      { field: "descripcion", header: "Descripcion" },
    ];

  }

  getArea() {
    this.areaService.getAreas().subscribe(

      (result: any) => {

        let areas: Area[] = [];

        for (let i = 0; i < result.length; i++) {
          let area = result[i] as Area;
          areas.push(area);
        }
        this.areas = areas
        this.cantidaRegistros = this.areas.length;
      },
      error => {
        console.log(error);
      }
    )
  }

  saveArea() {

    if (!this.edicion) {
      this.areaService.createArea(this.area).subscribe(
        (result: any) => {
          let area = result as Area;
          this.areas.push(area);
          this.addSingle();
          this.area.descripcion = null;
          this.area.nombre = null;
          this.displaySaveDialog = false;
          this.mensajeError = null;
          console.log("Objeto creado: ", area);

           this.getArea();

        },
        error => {
          console.log(error);
        }
      )
    }
    else {
      {
        this.areaService.PutArea(this.area).subscribe(
          (result: any) => {
            let area = result as Area;
            //this.areas.push(area);
            console.log("aresasssssd  ", this.areas)
            this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se modifico el aréa correctamente.' });
            this.displaySaveDialog = false;
            this.getArea();
            //this.validaArea(area);
            return
          },
          error => {
            console.log(error);
          }
        )
      }
    }

  }
  validaArea(area: Area) {
    let index = this.areas.findIndex((e) => e.idArea == this.selectedArea.idArea)
    if (index != -1) {
    this.area[index]=area
    }
    else
    {
      this.areas.push(area);
    }
  }

  deleteArea() {

    if (this.selectedArea == null || this.selectedArea.idArea == null) {
      this.messageService.clear();
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor Seleccione un registro.' });
      return;
    }

    this.confirmationService.confirm({
      message: "¿Esta Seguro que desea eliminar el Registro?",
      accept: () => {

        this.areaService.DeleteArea(this.selectedArea.idArea).subscribe(
          (result: any) => {

            this.messageService.add({
              severity: 'success', summary: "Resultado", detail: "Se elimino el area con Id: " + this.selectedArea.idArea + " Correctamente"
            })
            console.log("selectIdArea", this.selectedArea.idArea);
            this.deleteObject(this.selectedArea.idArea);
            this.mensajeError = "";
            this.cantidaRegistros = this.areas.length;
            this.selectedArea.idArea = null;
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

  deleteObject(idArea: number) {

    let index = this.areas.findIndex((e) => e.idArea == idArea);
    if (index != -1) {
      this.areas.splice(index, 1);
    }

    // console.log(this.areas);
    // let idFiltrar = idArea;
    // let obtenerArray = this.areas.find(element => element.idArea == idFiltrar);
    // let indiceBorrar = this.areas.indexOf(obtenerArray);
    // this.areas.splice(indiceBorrar, 1);
    // console.log(this.areas);
  }

  Cancelar() {
    this.displaySaveDialog = false;
    this.area.descripcion = null;
    this.area.nombre = null;

  }

  ShowSaveDialog(editar: boolean) {
    this.edicion = editar;
    if (editar) {
      if (this.selectedArea.idArea != null) {
        this.titulo="Edición"
        this.area = this.selectedArea;
        
      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor Seleccione un registro.' });
        return;
      }

    } else {
      this.titulo="Nuevo"
      this.area = new Area();            
    }
    this.mensajeError = null;
    this.displaySaveDialog = true;
    
  
  }

  addSingle() {
    this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se guardo el aréa correctamente.' });
  }



}
