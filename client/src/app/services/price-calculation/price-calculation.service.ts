import { Injectable } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart.interface';
import { ImageInterface } from 'src/app/interfaces/image.interface';
import { Price } from 'src/app/interfaces/price.interface';

@Injectable({
  providedIn: 'root',
})
export class PriceCalculationService {
  private picturePrices = [
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
    {
      size: 'passport',
      unitPrice: 15,
    },
    {
      size: 'stamp',
      unitPrice: 10,
    },
  ];

  constructor() {}

  calculateAllPrices(cart: Cart): Price {
    const passport = this.calculatePrice(cart.passportPictures || []);
    const gallery = this.calculatePrice(cart.galleryPictures || []);
    const shipping = this.getDelivaryPrice();
    const total = passport + gallery + shipping;
    return { passport, gallery, shipping, total };
  }

  private calculatePrice(imageList: ImageInterface[]): number {
    let total = 0;
    for (let picture of imageList) {
      total +=
        this.picturePrices.find((el) => el.size === picture.photoSize)
          ?.unitPrice || 0 * picture.copies;
    }
    return total;
  }

  private getDelivaryPrice() {
    return 120; //Implement Pathao price calculation
  }
}
