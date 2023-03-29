import { Component, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/orders/order.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  id: string = '';
  order?: Order;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private renderer: Renderer2
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.orderService.getOrdersbyId(this.id).subscribe((res) => {
      console.log(res);
      this.order = res;
    });
  }

  ngOnInit() {}
  downloadAllImages() {
    this.orderService.cutoutAndDownload(this.id).subscribe((res) => {
      const link = this.renderer.createElement('a');
      link.setAttribute('href', res.zipUrl);
      link.click();
      link.remove();
      const body = { orderStatus: 'printing' };
      const updatedBody = this.orderService
        .changeOrderStatus(this.id, body)
        .subscribe((response) => {
          this.router.navigate(['orders']);
        });
    });
  }
}
