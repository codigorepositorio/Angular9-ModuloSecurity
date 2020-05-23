import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
//import { RouteStateService } from '../../core/services/route-state.service';
import { SessionService } from 'src/app/core/services/session.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { CustomMenuItem } from 'src/app/core/models/menu-item.model';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/core/services/events.service';
// import { LoginComponent } from "../../login/login.component";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  @Input() items: CustomMenuItem[];

  @Input() className: string;

  selectedItem: string;

  @Output() closeClicked = new EventEmitter<boolean>();
  isMenuVisible: boolean;

  //agregado de prueba
  @Output() menuCerrarP: EventEmitter<any> = new EventEmitter<any>();

  @Output() toggleMenubar: EventEmitter<any> = new EventEmitter();

  mensaje:boolean;
  constructor(
    //private routeStateService: RouteStateService,
    private router: Router,
    private sessionService: SessionService,
    private toastService: ToastService,
    private servicioEvent: EventsService
  ) {}

  ngOnInit() {
    var activeMenu = this.sessionService.getItem("active-menu");
    if (activeMenu) {
      this.selectedItem = activeMenu;
    } else {
      this.selectedItem = "Home";
    }
  }

  // on menu click event
  onMenuClick(menu: CustomMenuItem) {
    //   console.log(menu);

    // if child are available then open child
    if (menu.Childs != undefined || menu.Childs != null) {
      this.toggleSubMenu(menu);
      this.closeClicked.emit(false);

      return;
    }
    if (
      menu.RouterLink == undefined ||
      menu.RouterLink == null ||
      menu.RouterLink == ""
    ) {
      this.toastService.addSingle("error", "", "404 Page not found.");
      return;
    }
    //cerrar menu
    // this.toggleMenubar.emit(); //ESTO CIERRA SOLO LO PRINCIPAL
    this.menuCerrar();

    
    this.selectedItem = menu.Label;
    this.sessionService.setItem("active-menu", menu.Label);
    //this.routeStateService.add(menu.Label, menu.RouterLink, null, true);
    this.router.navigate([menu.RouterLink]);

    // hide menu bar after menu click for mobile layout
    setTimeout(() => {
      this.closeClicked.emit(false);
      
    }, 100);
  }

  menuCerrar() {
    //CUANDO DE CLICK AQUI SE DEBE CERRAR EL MENU PADRE
   this.servicioEvent.enviarMensaje();
  }

  // toggle sub menu on click
  toggleSubMenu(menu: CustomMenuItem) {
    menu.IsChildVisible = !menu.IsChildVisible;
  }
}
