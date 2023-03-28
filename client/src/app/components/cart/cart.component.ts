import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImageInterface } from 'src/app/interfaces/image.interface';
import { CartService } from 'src/app/services/cart/cart.service';
import { IdbServiceService } from 'src/app/services/idbService/idb-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  passportOrders: ImageInterface[] = [];
  galleryOrders: ImageInterface[] = [];
  constructor(private idbService: IdbServiceService, private router: Router) {}

  async ngOnInit() {
    try {
      const all = await this.idbService.getAllForCart();
      this.passportOrders = all.passportPictures || [];
      this.galleryOrders = all.galleryPictures || [];
      console.log(this.passportOrders);
    } catch (error) {
      console.log(error);
    }
  }

  async deletePassportOrder() {
    try {
      await this.idbService.removeAllPassportPhotos();
      this.passportOrders = [];
    } catch (error) {
      console.log(error);
    }
  }

  async deleteGalleryOrder() {
    try {
      await this.idbService.removeAllGalleryPhotos();
      this.galleryOrders = [];
    } catch (error) {
      console.log(error);
    }
  }

  get hasOrder() {
    return this.galleryOrders.length || this.passportOrders.length;
  }

  async clearAll() {
    try {
      await this.idbService.clearAll();
      this.galleryOrders = [];
      this.passportOrders = [];
    } catch (error) {
      console.log(error);
    }
  }

  checkOut() {
    this.router.navigate(['user_address']);
  }
}
