import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImageInterface } from 'src/app/interfaces/image.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-retake',
  templateUrl: './retake.component.html',
  styleUrls: ['./retake.component.css'],
})
export class RetakeComponent {
  passportPicturesToRetake: ImageInterface[] = [];
  constructor(private orderService: OrderService, private router: Router) {
    this.orderService.getCustomerLatestOrder().subscribe((res) => {
      res.passportPictures?.forEach((pic) => {
        if (!pic.approved) this.passportPicturesToRetake.push(pic);
      });
    });
  }


  retake(id:string){

  }
}
