import { Component } from '@angular/core';
import { Order } from 'src/app/interfaces/order.interface';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { PriceCalculationService } from 'src/app/services/price-calculation/price-calculation.service';

@Component({
  selector: 'app-order-done',
  templateUrl: './order-done.component.html',
  styleUrls: ['./order-done.component.css'],
})
export class OrderDoneComponent {
  userInstruction: string | null = '';
  CompletedOrder: Order = {
    order_id:'hh',
    labId: 0,
    totalPrice: { passport: 0, gallery: 0, shipping: 0, total: 0 },
  };
  errorMessage = '';
  nothingInCart = false;
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private priceCalcultor: PriceCalculationService
  ) {}

  ngOnInit() {
    this.orderService.setOrderPaid().subscribe();
    this.cartService.clearCart().subscribe();
  }
}
