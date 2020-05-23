import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/core/models/categoria.model';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { CategoriaService } from 'src/app/core/services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  mensajeError: string = "";
  cantidaRegistros: number;
  categorias: Categoria[];
  cols: any[];
  edicion: boolean = false;
  items: MenuItem[];

  //Inicio: Variables Agregar Nuevo preguntas
  displaySaveDialog: boolean = false;

  categoria: Categoria = {
    idCategoria: 0, nombre: null, isActivo: null
  };

  selectedCategoria: Categoria = {
    idCategoria: null, nombre: null, isActivo: null
  }
  titulo: string = "";

  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }



  ngOnInit() {

    this.getCategoria();
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
        command: () => this.deleteCategoria()
      }
    ]

    this.cols = [
      { field: "idCategoria", header: "ID" },
      { field: "nombre", header: "Nombre" },
      { field: "isActivo", header: "Estado" },
    ];
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
        this.cantidaRegistros = this.categorias.length;
      },
      error => {
        console.log(error);
      }
    )
  }

  
  saveCategoria() {
    //debugger
    if (!this.edicion) {
      this.categoriaService.createCategoria(this.categoria).subscribe(
        (result: any) => {
          let categoria = result as Categoria;
          this.categorias.push(categoria);
          this.addSingle();
          this.categoria.nombre = null;
          this.categoria.isActivo = false;          
          this.displaySaveDialog = false;
          this.mensajeError = null;
          console.log("Objeto creado: ", categoria);
           this.getCategoria();

        },
        error => {
          console.log(error);
        }
      )
    }
    else {
      {
        this.categoriaService.PutCategoria(this.categoria).subscribe(
          (result: any) => {
            let categoria = result as Categoria;
            //this.areas.push(area);
            console.log("categoriass..  ", this.categorias)
            this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se modifico la categoria correctamente.' });
            this.displaySaveDialog = false;
            this.getCategoria();
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


  ShowSaveDialog(editar: boolean) {
    this.edicion = editar;
    if (editar) {
      if (this.selectedCategoria.idCategoria != null) {
        this.titulo = "Edición"
        this.categoria = this.selectedCategoria;

      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor Seleccione un registro.' });
        return;
      }

    } else {
      this.titulo = "Nuevo"
      this.categoria = new Categoria();
    }
    this.mensajeError = null;
    this.displaySaveDialog = true;


  }

  addSingle() {
    this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se guardo el categoria correctamente.' });
  }

  deleteCategoria() {

    if (this.selectedCategoria == null || this.selectedCategoria.idCategoria== null) {
      this.messageService.clear();
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor Seleccione un registro.' });
      return;
    }

    this.confirmationService.confirm({
      message: "¿Esta Seguro que desea eliminar el Registro?",
      accept: () => {

        this.categoriaService.DeleteCategoria(this.selectedCategoria.idCategoria).subscribe(
          (result: any) => {

            this.messageService.add({
              severity: 'success', summary: "Resultado", detail: "Se elimino el categoria con Id: " + this.selectedCategoria.idCategoria + " Correctamente"
            })
            console.log("selectCategoria", this.selectedCategoria.idCategoria);
            this.deleteObject(this.selectedCategoria.idCategoria);
            this.mensajeError = "";
            this.cantidaRegistros = this.categorias.length;
            this.selectedCategoria.idCategoria = null;
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
  deleteObject(idCategoria: number) {

    let index = this.categorias.findIndex((e) => e.idCategoria == idCategoria);
    if (index != -1) {
      this.categorias.splice(index, 1);
    }

  }

 Cancelar() {
    this.displaySaveDialog = false;
    this.categoria.nombre = null;
    this.categoria.isActivo = false;
  }



  
}
