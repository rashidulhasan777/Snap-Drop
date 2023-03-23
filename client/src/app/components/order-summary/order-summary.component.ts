import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart.interface';
import { User } from 'src/app/interfaces/user.interface';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent {
  User?: User;
  Cart!: Cart;
  instruction: string = '';

  galleryPicturePrice = [
    {
      size: '4R',
      unitPrice: 50,
    },
    {
      size: '6R',
      unitPrice: 70,
    },
    {
      size: '8R',
      unitPrice: 100,
    },
    {
      size: '10R',
      unitPrice: 200,
    },
  ];
  passportPicturePrice = [
    {
      size: 'passport',
      unitPrice: 15,
    },
    {
      size: 'stamp',
      unitPrice: 10,
    },
  ];

  constructor(
    private cartService: CartService,
    private userDataService: UserdataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userDataService.getUser().subscribe((res) => {
      this.User = res;
    });
    this.cartService.getCart().subscribe((res) => {
      this.Cart = res;
    });
  }

  get calculatedPassportPrice() {
    let total = 0;
    if (this.Cart && this.Cart.passportPictures) {
      for (let picture of this.Cart.passportPictures) {
        total +=
          this.passportPicturePrice.find((el) => el.size === picture.photoSize)
            ?.unitPrice || 0 * picture.copies;
      }
    }
    return total;
  }
  get calculatedGalleryPrice() {
    let total = 0;
    if (this.Cart && this.Cart.galleryPictures) {
      for (let picture of this.Cart.galleryPictures) {
        total +=
          this.galleryPicturePrice.find((el) => el.size === picture.photoSize)
            ?.unitPrice || 0 * picture.copies;
      }
    }
    return total;
  }

  initiatePayment() {
    if (this.instruction)
      localStorage.setItem('instructionFromUser', this.instruction);
    this.router.navigate(['order_done']);
  }
}
