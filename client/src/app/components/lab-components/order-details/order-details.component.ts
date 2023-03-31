import { Component, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/orders/order.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/app/services/loader/loader.service';

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
    private renderer: Renderer2,
    private loading: LoaderService
  ) {
    this.loading.setLoadingMsg('');
    this.loading.setLoading(true);
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.orderService.getOrdersbyId(this.id).subscribe((res) => {
      // console.log(res);
      this.order = res;
    });
  }

  ngOnInit() {
    this.loading.setLoading(false);
  }
  downloadAllImages() {
    this.loading.setLoadingMsg('Zipping the datas, please wait');
    this.loading.setLoading(true);
    this.orderService.cutoutAndDownload(this.id).subscribe({
      next: (res) => {
        const link = this.renderer.createElement('a');
        link.setAttribute('href', res.zipUrl);
        link.click();
        link.remove();
        const body = { orderStatus: 'printing' };
        const updatedBody = this.orderService
          .changeOrderStatus(this.id, body)
          .subscribe((response) => {
            this.loading.setLoading(false);
            this.router.navigate(['orders']);
          });
      },
      error: () => {
        this.loading.setLoadingMsg('Something went wrong. Please wait');

        setTimeout(() => this.router.navigate(['orders']), 1000);
      },
    });
  }
}
