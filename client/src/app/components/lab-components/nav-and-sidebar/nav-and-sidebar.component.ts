import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-nav-and-sidebar',
  templateUrl: './nav-and-sidebar.component.html',
  styleUrls: ['./nav-and-sidebar.component.css'],
})
export class NavAndSidebarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  isShowing = false;
  labId: number | undefined;
  labName: string | undefined;
  constructor(
    private authService: AuthenticationService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orderService.getOrdersbyLabId().subscribe((response) => {
      this.labId = response[0].labId;
      this.orderService.getLabName(this.labId).subscribe((response) => {
        this.labName = response.labName;
      });
    });
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  logout() {
    this.authService.logout();
  }
}
