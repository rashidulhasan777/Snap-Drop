import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { Price } from 'src/app/interfaces/price.interface';
import { User } from 'src/app/interfaces/user.interface';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { PriceCalculationService } from 'src/app/services/price-calculation/price-calculation.service';
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
  price: Price = { passport: 0, gallery: 0, shipping: 0, total: 0 };

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
        this.price = this.priceCalculator.calculateAllPrices(this.Cart);
      },
      error: () => {
        this.router.navigate(['cart']);
      },
    });
  }

  initiatePayment() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        const order: Order = {
          labId: 'sss', //Needs to change
          totalPrice: this.priceCalculator.calculateAllPrices(res),
          passportPictures: res.passportPictures,
          galleryPictures: res.galleryPictures,
          instruction: this.instruction || '',
        };
        this.orderService.createOrder(order).subscribe((res) => {
          this.CompletedOrder = res;
          this.router.navigate(['order_done']);
          setTimeout(() => {
            this.cartService.clearCart().subscribe();
          }, 5000);
        });
      },
    });
  }
}
