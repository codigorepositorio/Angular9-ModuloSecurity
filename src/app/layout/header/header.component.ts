import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
//import { RouteStateService } from '../../core/services/route-state.service';
//import { User } from '../../core/models/user.model';
//import { notification } from '../../core/models/notification.model';
import { UserIdleService } from 'angular-user-idle';
//import { ThemeService } from '../../core/services/theme.service';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  user: any; // retorna el usuario
  displayNotifications: boolean;

  //notifications: notification[];

  @Output() toggleMenubar: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    //private routeStateService: RouteStateService,
    private sessionService: SessionService,
    private userIdle: UserIdleService,
    //private themeService: ThemeService,
    private userContextService: UserContextService
  )
  
   {
    this.displayNotifications = false;

    var selectedTheme = this.sessionService.getItem("selected-theme");
    if (selectedTheme) {
      this.selectTheme(selectedTheme);
    }
  }

  ngOnInit() {
    this.user = this.sessionService.getItem("currentUser");
    
    // let usuario = this.sessionService.getItem("currentUser");
    // console.log(usuario);
    // console.log(typeof usuario);
    if (this.user == null) {
      this.router.navigate(['/main/dashboard']);
    }
    /* this.notifications = [];
    for (var i = 1; i <= 5; i++) {
      var notificationObj = new notification("Message " + i, new Date(), null)
      this.notifications.push(notificationObj);
    } */

    //Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe();

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      this.logout();
    });
  }

  logout() {
    this.userIdle.stopWatching();
    //this.routeStateService.removeAll();
    this.userContextService.logout();
    this.sessionService.removeItem("active-menu");
    this.router.navigate(["/login"]);
  }

  showNotificationSidebar() {
    this.displayNotifications = true;
  }

  toggleMenu() {
    // this.menuCerrarP.emit(false);
    this.toggleMenubar.emit();
  }

  selectTheme(theme: string) {
    //this.sessionService.setItem("selected-theme", theme);
    //this.themeService.selectTheme(theme);
  }
}
