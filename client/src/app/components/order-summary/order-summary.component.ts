import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart.interface';
import { Lab } from 'src/app/interfaces/lab.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { Price } from 'src/app/interfaces/price.interface';
import { User } from 'src/app/interfaces/user.interface';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { PriceCalculationService } from 'src/app/services/price-calculation/price-calculation.service';
import { UserdataService } from 'src/app/services/userdata/userdata.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent {
  User?: User;
  Cart!: Cart;
  instruction: string = '';
  price: Price = { passport: 0, gallery: 0, shipping: 0, total: 0 };
  closestLab?: Lab;
  CompletedOrder?: Order;
  constructor(
    private cartService: CartService,
    private userDataService: UserdataService,
    private priceCalculator: PriceCalculationService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userDataService.getUser().subscribe((res) => {
      this.User = res;
    });
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.Cart = res;
        this.priceCalculator.calculateAllPrices(
          this.Cart,
          95506,
          (totalPrice: Price) => {
            this.price = totalPrice;
          }
        );
      },
      error: () => {
        this.router.navigate(['cart']);
      },
    });
    this.userDataService.getClosestLab().subscribe((res) => console.log(res));
  }

  initiatePayment() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        let pending = false;
        if (res.passportPictures && res.passportPictures.length) pending = true;
        const order: Order = {
          order_id: 'ss',
          labId: 55865, //Needs to change
          // totalPrice: this.priceCalculator.calculateAllPrices(res, this.closestLab?.labId),
          totalPrice: this.price,
          passportPictures: res.passportPictures,
          galleryPictures: res.galleryPictures,
          orderStatus: pending ? 'pending' : 'approved',
          instruction: this.instruction || '',
        };
        this.orderService.cleanUnpaidOrders().subscribe(() => {
          this.orderService.createOrder(order).subscribe((res) => {
            this.CompletedOrder = res;
            this.router.navigate(['order_done']);
          });
        });
      },
    });
  }
}
