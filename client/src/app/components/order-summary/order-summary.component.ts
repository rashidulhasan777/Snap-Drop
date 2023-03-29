import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart.interface';
import { Lab } from 'src/app/interfaces/lab.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { Price } from 'src/app/interfaces/price.interface';
import { User } from 'src/app/interfaces/user.interface';
import { OrderService } from 'src/app/services/orders/order.service';
import { PriceCalculationService } from 'src/app/services/price-calculation/price-calculation.service';
import { UserdataService } from 'src/app/services/userdata/userdata.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { IdbServiceService } from 'src/app/services/idbService/idb-service.service';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';
import { firstValueFrom, Observable, zip } from 'rxjs';
import { ImageInterface } from 'src/app/interfaces/image.interface';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent {
  Cart: Cart = { galleryPictures: [], passportPictures: [] };
  User?: User;
  instruction: string = '';
  price: Price = { passport: 0, gallery: 0, shipping: 0, total: 0 };
  closestLab?: Lab;
  CompletedOrder?: Order;
  totalUploaded = 0;
  order_id = '';

  passportPictures: ImageInterface[] = [];
  galleryPictures: ImageInterface[] = [];
  constructor(
    private userDataService: UserdataService,
    private priceCalculator: PriceCalculationService,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private router: Router,
    private idbService: IdbServiceService,
    private cloudinary: CloudinaryService
  ) {}

  async ngOnInit() {
    this.userDataService.getUser().subscribe((res) => {
      this.User = res;
    });

    this.userDataService.getClosestLab().subscribe(async (res) => {
      console.log(res);
      this.closestLab = res;
      try {
        await this.setCart();
        this.Cart.galleryPictures = this.galleryPictures;
        this.Cart.passportPictures = this.passportPictures;
        this.priceCalculator.calculateAllPrices(
          {
            passportPictures: this.passportPictures,
            galleryPictures: this.galleryPictures,
          },
          this.closestLab?.labId || 95506,
          (totalPrice: Price) => {
            this.price = totalPrice;
          }
        );
      } catch (error) {
        console.log(error);
        this.router.navigate(['cart']);
      }
    });
  }

  async setCart() {
    try {
      const allData = await this.idbService.getAllForCart();
      this.galleryPictures = allData.galleryPictures;
      this.passportPictures = allData.passportPictures;
    } catch (error) {
      console.log(error);
    }
  }

  async uploadAllPicture(order_id: string, labId: number) {
    try {
      await this.idbService.updateGalleryPhotosName();
      await this.idbService.updatePassportPhotosWithCountry();
      await this.setCart();
      const passportSubsciption: Observable<any>[] = [];
      const gallerySubsciption: Observable<any>[] = [];
      this.passportPictures.forEach((el) => {
        passportSubsciption.push(
          this.cloudinary.cloudUpload(
            el.imageURL,
            el.orgFilename,
            order_id,
            labId,
            'passport_raw'
          )
        );
      });
      this.galleryPictures.forEach((el) => {
        gallerySubsciption.push(
          this.cloudinary.cloudUpload(
            el.imageURL,
            el.orgFilename,
            order_id,
            labId,
            'gallery'
          )
        );
      });
      const zippedPassport = zip(...passportSubsciption);
      const zippedGallery = zip(...gallerySubsciption);
      const passportValues = await firstValueFrom(zippedPassport);
      const galleryValuees = await firstValueFrom(zippedGallery);
      console.log(passportValues, galleryValuees);
      passportValues.forEach((el, idx) => {
        this.passportPictures[idx].imageURL = el.secure_url;
      });
      galleryValuees.forEach((el, idx) => {
        this.galleryPictures[idx].imageURL = el.secure_url;
      });
      // zippedPassport.subscribe((res) => {
      //   console.log(res);
      //   res.forEach((el: any, idx: number) => {
      //   });
      // });
      // zippedGallery.subscribe((res) => {
      //   console.log(res);
      //   res.forEach((el: any, idx: number) => {
      //     this.galleryPictures[idx].imageURL = el.secure_url;
      //   });
      // });
    } catch (err) {
      console.log(err);
    }
  }

  async initiatePayment() {
    this.orderService
      .generateOrderId(this.closestLab?.labId || 95506)
      .subscribe({
        next: async (res) => {
          this.order_id = res.orderId;
          try {
            console.log(this.closestLab?.labId);
            await this.uploadAllPicture(
              res.orderId,
              this.closestLab?.labId || 95506
            );
            this.createOrder();
          } catch (err) {
            console.log(err);
          }
        },
      });
  }

  createOrder() {
    let pending = false;
    if (this.passportPictures.length) pending = true;
    const order: Order = {
      order_id: this.order_id,
      labId: this.closestLab?.labId || 95506,
      totalPrice: this.price,
      passportPictures: this.passportPictures,
      galleryPictures: this.galleryPictures,
      orderStatus: pending ? 'pending' : 'approved',
      instruction: this.instruction || '',
    };
    this.orderService.cleanUnpaidOrders().subscribe(() => {
      this.orderService.createOrder(order).subscribe((res) => {
        this.CompletedOrder = res;
        this.paymentService
          .initiatePayment(
            this.CompletedOrder.order_id,
            this.CompletedOrder.totalPrice.total
          )
          .subscribe((response: any) => {
            if (response.url) window.location.href = response.url;
          });
      });
    });
  }
}
