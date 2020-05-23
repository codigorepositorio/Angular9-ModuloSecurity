import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FasesService } from 'src/app/core/services/fases.service';
import { PreguntasService } from 'src/app/core/services/preguntas.service';
import { AreaService } from 'src/app/core/services/area.service';
import { Area } from 'src/app/core/models/area.';

import { Preguntas } from 'src/app/core/models/Preguntas.model';
import { PeriodoService } from 'src/app/core/services/periodo.service';
import { Periodo } from 'src/app/core/models/periodo.model';
import { MedicionService } from 'src/app/core/services/medicion.service';
import { Medicion } from 'src/app/core/models/medicion.model';
import { DatePipe } from '@angular/common';


declare var Jquery: any;
declare var $: any;
@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class EvaluacionComponent implements OnInit {
  title = "Ejecucion de Jquery desde Angular 8"
  items: MenuItem[];
  items2: MenuItem[];
  fechaHora:string;

  //checked: boolean = false;
  codArea: any;

  arrayFases = [];
  arrayPreguntas = [];
  nombrefases = [];
  descripcionfases = [];

  FaseDataFiltro = [];
  Preguntas: Preguntas[];



  activeIndex: number = 0
  areas: any[];
  periodos: any[];
  sumaPuntos: number;
  medicion: Medicion;

  selectedCities: string[] = [];

  isActivo: boolean = false;

  opc: string;
  idEvaResultado: number;
  idEvaluacion: number;
  IdFase: number;
  IdPregunta: number;

  data: any;
  estadoBtnIniciar: boolean = true
    ;
  estadoBtnFinalizar: boolean = false;

  constructor(
    private service: FasesService,
    private pservice: PreguntasService,
    private areaService: AreaService,
    private periodoService: PeriodoService,
    private medicionService: MedicionService,
    private datePipe: DatePipe

  ) {

  }



  ngOnInit() {

  
    this.items2 = [
      {
        label: "Nuevo",
        icon: 'pi pi-fw pi-plus',
        // command:() => this.ShowSaveDialog(true)
      },
      {
        label: "Editar",
        icon: 'pi pi-fw pi-pencil',
        //command:() => this.ShowSaveDialog(true)
      }
    ]

    this.ConsultaFases();
    //this.ConsultaPreguntas();
    this.getArea();
    this.getPerido();


  }//fin OnInt   
  obtenerFecha() {
   this.fechaHora = this.datePipe.transform(new Date(),"MMM d, y, h:mm:ss a");
    console.log(this.fechaHora); //output - Feb 14, 2019, 3:45:06 PM
  }

  ConsultaFases() {

    this.service.consultaFases().subscribe(
      res => {
        console.log(res);
        this.arrayFases = res;
        let a = this.arrayFases.length
        for (let i = 0; i < a; i++) {
          let nombre = this.arrayFases[i].nombre
          let descripcion = this.arrayFases[i].descripcion
          this.nombrefases.push(nombre)
          this.descripcionfases.push(descripcion)
          this.FasesItems();
        }
      }
    )
  }

  FasesItems() {
    this.items = [{
      label: this.nombrefases[0],
      command: (event: any) => {
        this.activeIndex = 0
      }
    },
    {
      label: this.nombrefases[1],
      command: (event: any) => {
        this.activeIndex = 1;

      },
    },
    {
      label: this.nombrefases[2],
      command: (event: any) => {
        this.activeIndex = 2;
      },
    },
    {
      label: this.nombrefases[3],
      command: (event: any) => {
        this.activeIndex = 3;
      },
    },

    {
      label: this.nombrefases[4],
      command: (event: any) => {
        this.activeIndex = 4;
      },

    },

    ]
  }

  ConsultaPreguntas() {
    let me = this;
    this.medicionService.getPreguntas().subscribe(data => {

      let acumulador = 0;
      this.FaseDataFiltro = data;
      for (var i = 0; i < this.FaseDataFiltro.length; i++) {
        acumulador = Number(acumulador) + Number(this.FaseDataFiltro[i].puntaje)
      }
      console.log("contador: ", this.FaseDataFiltro);
      this.sumaPuntos = acumulador;
      // console.log("preguntas: " , this.FaseDataFiltro);
      this.medicionService.FaseUno = me.FaseDataFiltro.filter(fa => fa.idFase == 1);
      this.medicionService.FaseDos = me.FaseDataFiltro.filter(fa => fa.idFase == 2);
      this.medicionService.FaseTres = me.FaseDataFiltro.filter(fa => fa.idFase == 3);
      this.medicionService.FaseCuatro = me.FaseDataFiltro.filter(fa => fa.idFase == 4);
      this.medicionService.FaseCinco = me.FaseDataFiltro.filter(fa => fa.idFase == 5);      
      
    })
  }

  conteoPregunta(xopc: string, xidEvaResultado: number, idEvaluacion: number, idFase: number, idPregunta: number) {
    console.log("************************************************************************************************")
    // console.log(xopc);

    // console.log("opcion: "+xopc + " xidEvaResultado:"+ 
    // xidEvaResultado+" idEvaluacion:"+ idEvaluacion + "idFase:"+idFase,"idPregunta"+idPregunta); 

    this.medicion = {
      opc: xopc,
      idEvaResultado: xidEvaResultado,
      idEvaluacion: idEvaluacion,
      idFase: idFase,
      idPregunta: idPregunta,
      pregunta: "asd",
      puntaje: 0
    }

    //  this.medicion.opc=xopc,


    this.medicionService.puntajePreguntas(this.medicion).subscribe(
      res => {
        // console.log("medicion"+xopc);
        // console.log(this.medicion);
        this.ConsultaPreguntas();
      },
      err => {
        console.log("Ocurrio algún error");
      }
    );

  }

  getArea() {
    return this.areaService.getAreas().subscribe((response: Area[]) => {
      this.areas = response
      console.log("areas..........", this.areas);

      console.log("---------" + response[0].idArea);

    },
      error => console.error(error))
  }


  getPerido() {
    return this.periodoService.getPeriodos().subscribe((response: Periodo[]) => {
      this.periodos = response
      console.log("periodos..........", this.periodos);
    },
      error => console.error(error))
  }

  IniciarEvaluacion() {
    this.estadoBtnFinalizar = true
    this.estadoBtnIniciar = false
    this.ConsultaPreguntas();
    this.obtenerFecha();

  }

  FinalizarEvaluacion() {
    this.estadoBtnIniciar = true
    this.estadoBtnFinalizar = false
  }

  toggleTitle() {
    console.log('Le as dado click al boton');
    $('.title').slideToggle();

  }


}

