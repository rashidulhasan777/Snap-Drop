import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/orders/order.service';
import { Order } from 'src/app/interfaces/order.interface';
import { Router } from '@angular/router';
import { take } from 'rxjs';
// import { MatStepper } from '@angular/material/stepper';
// import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css'],
})
export class OrderStatusComponent implements OnInit {
  step: number = 0;
  order!: Order;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    const userOrder = this.orderService
      .getCustomerLatestOrder()
      .pipe(take(1))
      .subscribe((response) => {
        if (!response) return;
        this.order = response;
        console.log('order Status:', this.order.orderStatus);
        switch (this.order.orderStatus) {
          case 'pending':
            this.step = 0;
            break;
          case 'approved':
            this.step = 1;
            break;
          case 'printing':
            this.step = 2;
            break;
          case 'readyToDeliver':
            this.step = 3;
            break;
          default:
            this.step = 0;
            break;
        }
      });
  }
  goBack() {
    this.router.navigate(['user_dashboard']);
  }
}
