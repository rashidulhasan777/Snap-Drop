import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent {
  cartItemsLen?: number;

  constructor(
    private authService: AuthenticationService,
    private cart: CartService
  ) {}
  ngOnInit() {
    this.cart.getCart().subscribe((res) => {
      if (res)
        this.cartItemsLen =
          (res.galleryPictures?.length || 0) +
          (res.passportPictures?.length || 0);
    });
  }

  logout() {
    this.authService.logout();
  }
}
