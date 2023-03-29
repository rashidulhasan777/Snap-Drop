import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/orders/order.service';
import { MatDialog } from '@angular/material/dialog';
import { OnboardingComponent } from '../onboarding/onboarding.component';
import { UserdataService } from 'src/app/services/userdata/userdata.service';
import { User } from 'src/app/interfaces/user.interface';
import { Socket } from 'ngx-socket-io';
import { Order } from 'src/app/interfaces/order.interface';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  order?: Order;
  User?: User;
  constructor(
    private orderService: OrderService,
    private userData: UserdataService,
    private router: Router,
    public dialog: MatDialog,
    private socket: Socket
  ) {
    userData.requestNotificationPermission();
  }
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
    this.userData.getUser().subscribe((res) => {
      this.User = res;
      this.socket.emit('gimmeNotification', { userId: res._id });
      this.socket.on;
      if (this.User.newUser) this.openDialog();
    });
    this.orderService.getCustomerLatestOrder().subscribe((res) => {
      console.log(res);
      if (res && res.orderStatus === 'retake_needed') {
        this.router.navigate(['retake']);
      }
      this.order = res;
      // this.openDialog();
    });
  }

  goTimeline() {
    this.router.navigate(['order-status']);
  }
  openDialog() {
    const dialogRef = this.dialog.open(OnboardingComponent);
  }
}
