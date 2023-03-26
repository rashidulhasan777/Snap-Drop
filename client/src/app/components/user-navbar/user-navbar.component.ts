import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent {
  cartItemsLen?: number = 7;
  constructor(private authService: AuthenticationService) {}

  logout() {
    this.authService.logout();
  }
}
