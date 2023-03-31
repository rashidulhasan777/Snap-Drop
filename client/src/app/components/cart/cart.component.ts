import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImageInterface } from 'src/app/interfaces/image.interface';
import { Price } from 'src/app/interfaces/price.interface';
import { CartService } from 'src/app/services/cart/cart.service';
import { IdbServiceService } from 'src/app/services/idbService/idb-service.service';
import { PriceCalculationService } from 'src/app/services/price-calculation/price-calculation.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  passportOrders: ImageInterface[] = [];
  galleryOrders: ImageInterface[] = [];
  price: Price | undefined;

  constructor(
    private idbService: IdbServiceService,
    private router: Router,
    private priceService: PriceCalculationService
  ) {}

  async ngOnInit() {
    try {
      const all = await this.idbService.getAllForCart();
      this.passportOrders = all.passportPictures || [];
      this.galleryOrders = all.galleryPictures || [];
      this.price = await this.priceService.calculateAllPrices({
        passportPictures: this.passportOrders,
        galleryPictures: this.galleryOrders,
      });
      console.log(this.price);
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
    console.log('deleting gallery');
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
