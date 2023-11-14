import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { IdbServiceService } from 'src/app/services/idbService/idb-service.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { OrderService } from 'src/app/services/orders/order.service';
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
    this.loading.setBlockNavbar(true);

    userData.requestNotificationPermission();
  }

  async ngOnInit() {
    this.orderService.setOrderPaid().pipe(take(1)).subscribe();
    await this.idbService.clearAll();
  }
}
