import { Component } from '@angular/core';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  // using mock data
  orders: Order[] = [
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
}
