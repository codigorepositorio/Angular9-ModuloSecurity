import { Component, OnInit } from '@angular/core';
import { SessionService } from '../core/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  barChartData: any;

  doughnutChartData: any;

  msgs: any[];
  user: any;
  data: any
  constructor(
    private sessionService: 
    SessionService, private router: Router) {

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','agosto','sept'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [65, 59, 80, 81, 56, 55, 40,20,5]
          },

          {
              label: 'My Second dataset',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  }

  }

  ngOnInit() {
    // this.user = this.sessionService.getItem("currentUser");
    // if (this.user == null) {
    //   this.router.navigate(["login"]);
    // }
  }
}