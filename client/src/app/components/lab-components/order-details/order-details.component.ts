import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/orders/order.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  id: string = '';
  order?: Order;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  isShowing = false;
  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
    ) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
      this.orderService.getOrdersbyId(this.id).subscribe((res) => {
        console.log(res);
        this.order = res;
    });
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  ngOnInit() {}
  downloadAllImages(){}
}
