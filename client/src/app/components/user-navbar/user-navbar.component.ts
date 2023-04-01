import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { IdbServiceService } from 'src/app/services/idbService/idb-service.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent {
  selectedButton: string = 'button1';

  constructor(
    private authService: AuthenticationService,
    private cart: CartService,
    private idb: IdbServiceService
  ) {}
  async ngOnInit() {
    // this.cart.getCart().subscribe((res) => {
    //   console.log(res);
    //   if (res)
    //     this.cartItemsLen =
    //       (res.galleryPictures?.length || 0) +
    //       (res.passportPictures?.length || 0);
    // });
  }

  logout() {
    this.authService.logout();
  }
  async getCartItemsLen() {
    try {
      const result = await this.idb.getAllForCart();
      const count =
        (result.galleryPictures ? result.galleryPictures.length : 0) +
        (result.passportPictures ? result.passportPictures.length : 0);
      return count;
    } catch (err) {
      console.log(err);
      return 0;
    }
  }
}
