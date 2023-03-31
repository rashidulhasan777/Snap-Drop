import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order.interface';
import { CartService } from 'src/app/services/cart/cart.service';
import { IdbServiceService } from 'src/app/services/idbService/idb-service.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { PriceCalculationService } from 'src/app/services/price-calculation/price-calculation.service';
import { UserdataService } from 'src/app/services/userdata/userdata.service';

@Component({
  selector: 'app-order-done',
  templateUrl: './order-done.component.html',
  styleUrls: ['./order-done.component.css'],
})
export class OrderDoneComponent {
  constructor(
    private orderService: OrderService,
    private userData: UserdataService,
    private idbService: IdbServiceService,
    private router: Router,
    private loading: LoaderService
  ) {
    this.loading.setLoadingMsg('');
    userData.requestNotificationPermission();
  }

  async ngOnInit() {
    this.orderService.setOrderPaid().subscribe();
    await this.idbService.clearAll();
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 3000);
  }
}
