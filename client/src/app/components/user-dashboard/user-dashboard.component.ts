import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  constructor(private orderService: OrderService, private router: Router) {}
  // using mock data
  orders: any[] = [
    {
      _id: '123456',
      orderStatus: 'picked up for Delivery',
      orderDate: new Date('March 17, 2023 03:24:00'),
      pictures: [
        {
          photoSize: '',
          copies: 4,
          imageURL:
            'https://imglarger.com/Images/before-after/ai-image-enlarger-1-after-2.jpg',
        },
      ],
      orderType: 'passport',
    },
  ];

  ngOnInit() {
    this.orderService.getCustomerLatestOrder().subscribe((res) => {
      console.log(res);
      if (res.orderStatus === 'retake_needed') {
        this.router.navigate(['retake']);
      }
    });
  }
}
