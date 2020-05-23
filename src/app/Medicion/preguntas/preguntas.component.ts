import { Component, OnInit } from '@angular/core';
import { PreguntasService } from 'src/app/core/services/preguntas.service';
import { Preguntas } from 'src/app/core/models/Preguntas.model';
import { Fases } from 'src/app/core/models/Fases.model';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/components/common/menuitem';
import { SessionService } from 'src/app/core/services/session.service';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { Categoria } from 'src/app/core/models/categoria.model';
declare var Jquery: any;
declare var $: any;
@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent implements OnInit {

  categorias: Categoria[];
  //menu

  items: MenuItem[];
  //Inicio:Varibles para crear una nueva Pregunta 
  codFase: any;

  codPregunta: any;

  codCategoria: any;
  nombre: string;
  puntaje: number;
  isActivo: false;
  model: Preguntas;

  preguntas: Preguntas[];

  cantidaRegistros: number
  selectpreguntas: Preguntas;
  //Fin-----------------------------------------

  //Inicio: Carga Combo Fases------------------------
  fases: Fases[];
  arrayFases = [];
  //Fin
  user: any;
  mensajeError: string = '';

  //Inicio: Variables Agregar Nuevo preguntas
  displaySaveDialog: boolean = false;

  constructor(
    private preguntasService: PreguntasService,
    private messageService: MessageService,
    private sessionService: SessionService,
    private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.getPregunta();
    this.getFase();
    this.getCategoria();
    this.ConsultaFases();
    this.user = this.sessionService.getItem("currentUser");
    console.log(this.user.Cod_Usuario);


    this.items = [
      {
        label: "Nuevo",
        icon: 'pi pi-fw pi-plus',
        command: () => this.ShowSaveDialog(true)
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
  }

  getPregunta() {
    return this.preguntasService.getPreguntas().subscribe((response: Preguntas[]) => {
      this.preguntas = response
      this.cantidaRegistros = this.preguntas.length;
    },
      error => console.error(error))
  }


  putPregunta() {

    this.model = {
      idPregunta: this.codPregunta.idPregunta,
      idFase: this.codFase.idFase,
      nombre: this.nombre,
      descripcion: "null",
      puntaje: this.puntaje,
      isActivo: this.isActivo,
      IsPreguntaActivo: ""
    }


    console.log(this.model);

    this.preguntasService.actualizaPreguntas(this.model).subscribe(
      res => {
        this.nombre = null;
        this.puntaje = 0;
        this.isActivo = false;
        this.mensajeError = null;
        //this.preguntas.push(this.model);        
        this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se modifico correctamente la Pregunta.' });
        this.displaySaveDialog = false;
        this.getPregunta();
      },

      err => {
        console.log(err);
        // console.log(err.error);
        this.mensajeError = err.error;
      }
    );
  }



  postPregunta() {

    this.model = {
      idPregunta: 0,
      idFase: this.codFase.idFase,
      idCategoria: this.codCategoria.idCategoria,
      nombre: this.nombre,
      descripcion: "null",
      puntaje: this.puntaje,
      isActivo: this.isActivo,
      IsPreguntaActivo: ""
    }


    console.log(this.model);

    this.preguntasService.createPregunta(this.model).subscribe(
      res => {
        this.nombre = null;
        this.puntaje = 0;
        this.isActivo = false;
        this.mensajeError = null;
        //this.preguntas.push(this.model);        
        this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se guardo correctamente la Pregunta.' });
        this.displaySaveDialog = false;
        this.getPregunta();
      },

      err => {
        console.log(err);
        // console.log(err.error);
        this.mensajeError = err.error;
      }
    );
  }

  delPregunta(id: number) {
    const idPregunta: any = {
      idPregunta: id
    }

    this.preguntasService.eliminaPreguntas(idPregunta).subscribe(
      res => {

        // console.log(this.preguntas);
        // //QUITAR
        // //Obtener el id del que se va a filtrar
        // let idFiltrar = idPregunta;

        // //Busco el array que voy a borrar
        // let obtenerArray = this.preguntas.find(element => element.idPregunta == idFiltrar);

        // //obtengo el indice de array para borrar
        // let indiceBorrar = this.preguntas.indexOf(obtenerArray);

        // //borro del array de la busqueda
        // this.preguntas.splice(indiceBorrar, 1);

        // console.log(this.preguntas);
        this.getPregunta();
      },

      err => {
        alert(idPregunta);
        console.log(idPregunta);
        console.log("Ocurrio algún error");
      }
    );
  }

  habilitaPregunta(id: number) {

    const idPregunta: any = {
      idPregunta: id
    }
    this.preguntasService.HabilitaPreguntas(idPregunta).subscribe(
      res => {
        console.log(this.preguntas);
        this.getPregunta();
      },
      err => {
        console.log("Ocurrio algún error");
      }
    );
  }

  getFase() {
    return this.preguntasService.getFases().subscribe((response: Fases[]) => {
      this.fases = response
    },
      error => console.error(error))
  }

  ConsultaFases() {

    this.preguntasService.getFases().subscribe(
      res => {
        console.log(res);
        this.arrayFases = res;
        let a = this.arrayFases.length
      }
    )
  }

  getCategoria() {
    this.categoriaService.getCategorias().subscribe(

      (result: any) => {

        let categorias: Categoria[] = [];

        for (let i = 0; i < result.length; i++) {
          let categoria = result[i] as Categoria;
          categorias.push(categoria);
        }
        this.categorias = categorias

      },
      error => {
        console.log(error);
      }
    )
  }

  ShowSaveDialog(editar: boolean) {

    this.displaySaveDialog = true;
  }

}


