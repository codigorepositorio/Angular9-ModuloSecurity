import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Periodo } from 'src/app/core/models/periodo.model';
import { PeriodoService } from 'src/app/core/services/periodo.service';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.scss']
})
export class PeriodoComponent implements OnInit {
  cantidaRegistros:number;
  periodos: Periodo[];
  cols: any[];

  edicion: boolean = false;

  items: MenuItem[];
  //Inicio: Variables Agregar Nuevo preguntas
  displaySaveDialog: boolean = false;

  periodo: Periodo = {
    idPeriodo: 0, fechaInicio: null, fechaFin: null, nombre: null, descripcion: null
  };

  selectedPeriodo: Periodo = {
    idPeriodo: 0, fechaInicio: null, fechaFin: null, nombre: null, descripcion: null
  }


  constructor(private periodoService: PeriodoService, private messageService: MessageService) { }

  
  
  ngOnInit() {

    this.FormatoTablas();
    this.getPeriodo();
  }


  FormatoTablas()
  {
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
        command: () => this.ShowSaveDialog(true)
      }
    ]

    this.cols = [
      { field: "idPeriodo", header: "ID" },
      { field: "fechaInicio",slice:"0:10" , header: "Inicio" },
      //<td class="ui-resizable-column">{{item.fechCrea| slice:0:10}} | {{item.fechCrea| slice:11:25}}</td>
      { field: "fechaFin", header: "Fin" },
      { field: "nombre", header: "Nombre" },
      { field: "descripcion", header: "Descripción" },
      
      
    ];

  }
  ShowSaveDialog(editar: boolean) {
    this.edicion = editar;
    if (editar) {
      if (this.selectedPeriodo.idPeriodo != null) {
        this.periodo = this.selectedPeriodo;
      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Seleccione un registro.' });
        return;
      }

    } else {
      this.periodo = new Periodo();
    }

    this.displaySaveDialog = true;

  }

  getPeriodo() {
    this.periodoService.getPeriodos().subscribe(

      (result: any) => {

        let periodos: Periodo[] = [];

        for (let i = 0; i < result.length; i++) {
          let periodo = result[i] as Periodo;
          periodos.push(periodo);
        }
        this.periodos = periodos
        this.cantidaRegistros = this.periodos.length;
        console.log("carga periodos",periodos);
      },
      error => {
        console.log(error);
      }
    )
  }
  createArea() {

    if (!this.edicion) {
      this.periodoService.createPeriodos(this.periodo).subscribe(
        (result: any) => {
          let periodo = result as Periodo;
          this.periodos.push(periodo);
          this.addSingle();
          this.periodo.descripcion = null;
          this.periodo.nombre = null;
          this.displaySaveDialog = false;
          this.getPeriodo();
        },
        error => {
          console.log(error);
        }
      )
    }
    else {
      {
        this.periodoService.PutPeriodos(this.periodo).subscribe(
          (result: any) => {
            let area = result as Periodo;
            //this.areas.push(area);
            console.log("aresasssssd  ", this.periodos)
            this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se modifico el aréa correctamente.' });
            this.displaySaveDialog = false;
            this.getPeriodo()
            return
          },
          error => {
            console.log(error);
          }
        )
      }
    }


  }


  addSingle() {
    this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se guardo el aréa correctamente.' });
  }

  Cancelar() {
    this.displaySaveDialog = false;
    this.periodo.descripcion = null;
    this.periodo.nombre = null;

  }


}
