import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { IdbServiceService } from 'src/app/services/idbService/idb-service.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent {
  selectedButton: string = 'button1';

  constructor(
    private authService: AuthenticationService,
    private loading: LoaderService
  ) {}
  async ngOnInit() {
    await this.loading.setItemsInCart();
  }

  logout() {
    this.authService.logout();
  }
  getCartItemsLen() {
    return this.loading.getItemsInCart();
  }
}
