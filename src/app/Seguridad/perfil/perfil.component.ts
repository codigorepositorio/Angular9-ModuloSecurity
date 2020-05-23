import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { segPerfil } from 'src/app/core/models/seg.Perfil';
import { SegPerfilService } from 'src/app/core/services/seg-perfil.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { trigger, transition, state, animate, style } from '@angular/animations';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  

  animations:  [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]

})
export class PerfilComponent implements OnInit {

  constructor
  (
    private segPerfilService:SegPerfilService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    
    ) { }



  mensajeError: string = "";
  cantidaRegistros: number;

  segPerfiles: segPerfil[];

  cols: any[];
  edicion: boolean = false;
  items: MenuItem[];

  //Inicio: Variables Agregar Nuevo preguntas
  displaySaveDialog: boolean = false;

  segperfil: segPerfil = {

    idPerfil: 1
    ,nomPerfil: null
    ,isPerfilActivo: false
    ,regCreate:null    
    ,regUpdate:null
    ,regCreateIdUsuario:null
    ,regUpdateIdUsuario:null
  };

  selectedPerfil: segPerfil = {
    idPerfil:null
    ,nomPerfil: null
    ,isPerfilActivo: false
    ,regCreate:null    
    ,regUpdate:null
    ,regCreateIdUsuario:null
    ,regUpdateIdUsuario:null 
  };
  titulo: string = "";

  ngOnInit() {


    this.getPerfil();
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
        command: () => this.deletePerfil()
      }
      ,
      {
        label: "Refresh",
        icon: 'fas fa-sync',
        command: () => this.getPerfil()
      }
    ]

    this.cols = [
      
      { field: "idPerfil", header: "ID" },
      { field: "nomPerfil", header: "Nombre" },
      { field: "isPerfilActivo", header: "Activo" },
      { field: "regCreate", header: "Fecha Creación" },
      { field: "regCreateIdUsuario", header: "USuario Creacion" },
      { field: "regUpdate", header: "Fecha Modificación" },      
      { field: "regUpdateIdUsuario", header: "Usuario Modificación" },


    ];
  }

  getPerfil() {
    this.segPerfilService.getPerfil().subscribe(

      (result: any) => {

        let segPerfiles: segPerfil[] = [];

        for (let i = 0; i < result.length; i++) {
          let segPerfile = result[i] as segPerfil;
          segPerfiles.push(segPerfile);
        }
        this.segPerfiles = segPerfiles
        this.cantidaRegistros = this.segPerfiles.length;

        console.log(this.segPerfiles);

      },
      error => {
        console.log(error);
      }
    )
  }

  savePerfil() {

    if (!this.edicion) {
      this.segPerfilService.createPerfil(this.segperfil).subscribe(
        (result: any) => {
          let segPerfil = result as segPerfil;

          this.validaPerfil(segPerfil)

          //this.segUsuarios.push(segUsuario);          

          this.displaySaveDialog = false;
          this.mensajeError = null;
          this.addSingle(segPerfil.idPerfil);
          console.log("Objeto creado: ", segPerfil);
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
        this.segPerfilService.PutPerfil(this.segperfil).subscribe(
          (result: any) => {
            let segPerfil = result as segPerfil;
            this.validaPerfil(segPerfil)
            //this.segUsuarios.push(segUsuario);            
            this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se modifico el Perfil con ID: '+ this.selectedPerfil.idPerfil +' correctamente.' });
            this.displaySaveDialog = false;            
            console.log("usuarioS MODIFICADO", segPerfil)
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

  validaPerfil(segperfil:segPerfil){


    let index = this.segPerfiles.findIndex((e) => e.idPerfil == segperfil.idPerfil);
    if (index != -1)
    {
      this.segPerfiles[index] = segperfil
    } else{
      this.segPerfiles.push(segperfil)
    }
  
  }

  ShowSaveDialog(editar: boolean) {
    this.edicion = editar;
    if (editar) {
      if (this.selectedPerfil.idPerfil != null) {
        this.titulo = "Edición"
        this.segperfil = this.selectedPerfil;

      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor Seleccione un registro.' });
        return;
      }

    } else {
      this.titulo = "Nuevo"
      this.segperfil = new segPerfil();
    }
    this.mensajeError = null;
    this.displaySaveDialog = true;


  }

  deletePerfil() {

    if (this.selectedPerfil == null || this.selectedPerfil.idPerfil == null) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor Seleccione un registro.' });
      return;
    }

    this.confirmationService.confirm({
      message: "¿Esta Seguro que desea eliminar el Registro?",
      accept: () => {

        this.segPerfilService.Deshabilitar(this.selectedPerfil.idPerfil,this.selectedPerfil.regCreateIdUsuario).subscribe(
          (result: any) => {
  
            this.messageService.add({
              severity: 'success', summary: "Resultado", detail: "Se elimino el Perfil con Id: " + this.selectedPerfil.idPerfil + " Correctamente"
            })
            console.log("selectIdPerfil", this.selectedPerfil.idPerfil);
            this.deleteObject(this.selectedPerfil.idPerfil);
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

  deleteObject(idPerfil: number) {

    let index = this.segPerfiles.findIndex((e) => e.idPerfil == idPerfil);
    if (index != -1) {
      this.segPerfiles.splice(index, 1);
    }
  }

  Cancelar() {
    if(!this.edicion)
    {
      this.clearCampos();
    }    
    this.displaySaveDialog = false;    
  }

  addSingle(id:number) {
    this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se creo el Perfil con ID: '+ id +' correctamente.' });
  }

  clearCampos() {
    this.segperfil.idPerfil = 0;
    this.segperfil.nomPerfil =null;
    this.segperfil.isPerfilActivo =false;
  }

  cantidadRegistro(){
    this.cantidaRegistros = this.segPerfiles.length;
  }

}
