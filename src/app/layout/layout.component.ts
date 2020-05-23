import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
//import { ApplicationStateService } from '../core/services/application-state.service';
import { ToastService } from '../core/services/toast.service';
import { CustomMenuItem } from '../core/models/menu-item.model';
import { MenuDataService } from '../core/services/menu-data.service';
import { LoaderService } from '../core/services/loader.service';
import { EventsService } from '../core/services/events.service';

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"]
})
export class LayoutComponent implements AfterViewInit, OnInit{
  menuItems: CustomMenuItem[];

  isMenuVisible: boolean;

  isMobileResolution: boolean = false;
  mensaje:boolean = false;
  @ViewChild("menubar", { static: false }) menubar: Sidebar;

  constructor(
    private toastService: ToastService,
    private loaderService: LoaderService,
    private menuDataService: MenuDataService, //private applicationStateService: ApplicationStateService
    private servicioEvent: EventsService
  ) {}

  ngOnInit() {
    this.loaderService.show();
    this.menuItems = this.menuDataService.getMenuList();
    //this.isMobileResolution = this.applicationStateService.getIsMobileResolution();

    if (this.isMobileResolution) {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
      // this.toggleMenu();
    }

    //Para ocultar menu en tamaño mediano
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };

      this.servicioEvent.enviarMensajeObservable.subscribe(mensaje => {
        if (this.isMobile) {
          this.toggleMenu();
        } 
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loaderService.hide();
    }, 1000);
  }
  //ESTO ES LO QUE CIERRA AL MENU
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  
  isMobile = false;
  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;
    // console.log(w);
    if (w <= breakpoint) {
      this.isMenuVisible = false;
      return true;
    } else {
      // this.isMenuVisible = true;
      // return false;
    }
  }
}
