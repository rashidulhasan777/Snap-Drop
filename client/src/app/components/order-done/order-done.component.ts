import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Order } from 'src/app/interfaces/order.interface';
import { CartService } from 'src/app/services/cart/cart.service';
import { IdbServiceService } from 'src/app/services/idbService/idb-service.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { PriceCalculationService } from 'src/app/services/price-calculation/price-calculation.service';

@Component({
  selector: 'app-order-done',
  templateUrl: './order-done.component.html',
  styleUrls: ['./order-done.component.css'],
})
export class OrderDoneComponent {
  constructor(
    private orderService: OrderService,
    private idbService: IdbServiceService
  ) {}

  ngOnInit() {
    this.orderService.setOrderPaid().subscribe();
    this.idbService.clearAll();
  }
}
