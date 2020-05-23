import { Component, OnInit, Input, Output, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';

declare var Jquery: any;
declare var $: any;

@Component({
  selector: 'app-preguntas-evaluacion',
  templateUrl: './preguntas-evaluacion.component.html',
  styleUrls: ['./preguntas-evaluacion.component.scss']
})


export class PreguntasEvaluacionComponent implements OnInit {

  @Input() arrayPreguntas = [];
  @Input() descripcionfases = [];
  puntaje: number = 5;
  lado: number = 0;

  constructor() { }

  ngOnInit() {
  }

  mensaje() { }


  cambiaLado(valor) {
    this.lado = valor;
  }



}
