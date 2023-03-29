import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImageInterface } from 'src/app/interfaces/image.interface';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})

export class CartComponent {
  passportOrders: ImageInterface[] = [];
  galleryOrders: ImageInterface[] = [];
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((res) => {
      console.log(res);
      if (!res) return;
      this.passportOrders = res.passportPictures || [];
      this.galleryOrders = res.galleryPictures || [];
    });
  }

  deletePassportOrder() {
    this.cartService.updateCart({ passportPictures: [] }).subscribe();
    this.passportOrders = [];
  }
  deleteGalleryOrder() {
    this.cartService.updateCart({ galleryPictures: [] }).subscribe();
    this.galleryOrders = [];
  }

  get hasOrder() {
    return this.galleryOrders.length || this.passportOrders.length;
  }

  clearAll() {
    this.cartService.clearCart().subscribe();
    this.galleryOrders = [];
    this.passportOrders = [];
  }

  checkOut() {
    this.router.navigate(['user_address']);
  }
}
