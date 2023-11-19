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
import { firstValueFrom, Observable, take, zip } from 'rxjs';
import { ImageInterface } from 'src/app/interfaces/image.interface';
import { LoaderService } from 'src/app/services/loader/loader.service';

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
  countryForPassport = 'Bangladesh';

  passportPictures: ImageInterface[] = [];
  galleryPictures: ImageInterface[] = [];
  constructor(
    private userDataService: UserdataService,
    private priceCalculator: PriceCalculationService,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private router: Router,
    private idbService: IdbServiceService,
    private cloudinary: CloudinaryService,
    private loading: LoaderService
  ) {
    this.loading.setLoadingMsg('');
    this.loading.setLoading(true);
    this.loading.setBlockNavbar(false);
  }

  async ngOnInit() {
    this.userDataService
      .getUser()
      .pipe(take(1))
      .subscribe((res) => {
        this.User = res;
      });
    this.countryForPassport =
      (await this.idbService.getCountry()) || 'Bangladesh';

    this.userDataService
      .getClosestLab()
      .pipe(take(1))
      .subscribe(async (res) => {
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
            this.closestLab?.labId || 56083,
            (totalPrice: Price) => {
              this.price = totalPrice;
            }
          );
          this.loading.setLoading(false);
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
      // const passportValues = await firstValueFrom(zippedPassport);
      // const galleryValuees = await firstValueFrom(zippedGallery);
      // console.log(passportValues, galleryValuees);
      console.log(this.passportPictures);
      console.log(this.galleryPictures);

      const initialZip = this.passportPictures.length
        ? zippedPassport
        : zippedGallery;
      console.log(initialZip === zippedPassport);
      const initialArr = this.passportPictures.length
        ? this.passportPictures
        : this.galleryPictures;

      initialZip.pipe(take(1)).subscribe((res) => {
        res.forEach((el: any, idx: number) => {
          initialArr[idx].imageURL = el.secure_url;
        });
        console.log(this.passportPictures);

        if (initialZip === zippedPassport) {
          zippedGallery.pipe(take(1)).subscribe((res) => {
            res.forEach((el: any, idx: number) => {
              this.galleryPictures[idx].imageURL = el.secure_url;
            });
            console.log(this.galleryPictures);
            this.createOrder();
          });
          if (!this.galleryPictures.length) this.createOrder();
        } else {
          console.log('here before create order');
          this.createOrder();
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  async initiatePayment() {
    this.loading.setLoadingMsg('Uploading pictures, Please wait.');
    this.loading.setLoading(true);
    this.orderService
      .generateOrderId(this.closestLab?.labId || 56083)
      .pipe(take(1))
      .subscribe({
        next: async (res) => {
          this.order_id = res.orderId;
          try {
            console.log(this.closestLab?.labId);
            await this.uploadAllPicture(
              res.orderId,
              this.closestLab?.labId || 56083
            );
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
      labId: this.closestLab?.labId || 56083,
      totalPrice: this.price,
      countryForPassport: this.countryForPassport,
      passportPictures: this.passportPictures,
      galleryPictures: this.galleryPictures,
      orderStatus: pending ? 'pending' : 'approved',
      instruction: this.instruction || '',
    };
    this.orderService
      .createOrder(order)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
        this.CompletedOrder = res;
        this.paymentService
          .initiatePayment(
            this.CompletedOrder.order_id,
            this.CompletedOrder.totalPrice.total
          )
          .pipe(take(1))
          .subscribe((response: any) => {
            this.loading.setLoading(false);
            this.loading.setLoadingMsg('');
            console.log(response.url);
            if (response.url) window.location.href = response.url;
          });
      });
  }
}
