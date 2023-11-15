import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Cart } from 'src/app/interfaces/cart.interface';
import { ImageInterface } from 'src/app/interfaces/image.interface';
import { Price } from 'src/app/interfaces/price.interface';
import { baseBackendURL } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class PriceCalculationService {
  private baseUrl = baseBackendURL;
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

  constructor(private http: HttpClient) {}

  calculateAllPrices(
    cart: Cart,
    store_id?: number,
    callback?: (total: Price) => void
  ): Price | undefined {
    const passport = this.calculatePrice(cart.passportPictures || []);
    const gallery = this.calculatePrice(cart.galleryPictures || []);
    if (store_id && callback)
      this.getDelivaryPrice(store_id).pipe(take(1)).subscribe((res) => {
        const total = passport + gallery + res.priceEstimateData.price;
        callback({
          passport,
          gallery,
          shipping: res.priceEstimateData.price,
          total,
        });
      });
    return { passport, gallery, shipping: 0, total: passport + gallery };
    // const total = passport + gallery + shipping;
  }

  private calculatePrice(imageList: ImageInterface[]): number {
    let total = 0;
    for (let picture of imageList) {
      total +=
        (this.picturePrices.find((el) => el.size === picture.photoSize)
          ?.unitPrice || 0) * picture.copies;
    }
    return total;
  }

  private getDelivaryPrice(
    store_id: number
  ): Observable<{ priceEstimateData: any }> {
    return this.http.post<{ priceEstimateData: any }>(
      this.baseUrl + '/pathao/price-calculation',
      { store_id, pathaoToken: this.pathaoToken },
      {
        headers: {
          Authorization: `Bearer ${this.jwtToken}`,
        },
      }
    );
  }
  private get jwtToken() {
    return localStorage.getItem('userAccessToken');
  }

  get pathaoToken() {
    return JSON.parse(localStorage.getItem('pathaoAccessToken') || '""')
      .access_token;
  }
}
