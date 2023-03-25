import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-nav-and-sidebar',
  templateUrl: './nav-and-sidebar.component.html',
  styleUrls: ['./nav-and-sidebar.component.css'],
})
export class NavAndSidebarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  isShowing = false;
  constructor(private authService: AuthenticationService) {}
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
