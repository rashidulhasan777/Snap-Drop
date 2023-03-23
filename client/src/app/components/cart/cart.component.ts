import { Component } from '@angular/core';
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
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((res) => {
      this.passportOrders = res.passportPictures || [];
      this.galleryOrders = res.galleryPictures || [];
    });
  }

  deletePassportOrder() {
    this.cartService.updateCart({ passportPictures: [] });
    this.passportOrders = [];
  }
  deleteGalleryOrder() {
    this.cartService.updateCart({ galleryPictures: [] });
    this.galleryOrders = [];
  }

  get hasOrder() {
    return this.galleryOrders.length || this.passportOrders.length;
  }

  clearAll() {
    this.deleteGalleryOrder();
    this.deletePassportOrder();
  }

  checkOut() {}
}
