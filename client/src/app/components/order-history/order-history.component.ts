import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Order } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  constructor(private orderService: OrderService) {}
  selectedButton = 'paid';
  orders: Order[] = [];
  AllOrders: Order[] = [];
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.orderService
      .getCustomerOrders()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.AllOrders = res;
          this.getPaid();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  getPaid() {
    this.selectedButton = 'paid';
    this.orders = this.AllOrders.filter((order) => order.paid === true);
    this.orders.reverse();
  }
  getUnpaid() {
    this.selectedButton = 'Unpaid';
    this.orders = this.AllOrders.filter((order) => order.paid === false);
    console.log(this.orders);
  }
  getDelivered() {
    this.selectedButton = 'Delivered';
    this.orders = this.AllOrders.filter(
      (order) => order.orderStatus === 'Delivered'
    );
  }
  clearUnpaidOrder() {
    const unpaidOrders = this.AllOrders.filter((order) => order.paid === false);
    if (unpaidOrders.length > 0) {
      unpaidOrders.forEach((order) => {
        this.orderService
          .cleanUnpaidOrders()
          .pipe(take(1))
          .subscribe({
            next: (res) => {
              this.getOrders();
            },
            error: (error) => {
              console.log(error);
            },
          });
      });
    }
  }
}
