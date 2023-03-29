import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/orders/order.service';
import { MatDialog } from '@angular/material/dialog';
import { OnboardingComponent } from '../onboarding/onboarding.component';
import { UserdataService } from 'src/app/services/userdata/userdata.service';
import { User } from 'src/app/interfaces/user.interface';
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
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userData.getUser().subscribe((res) => {
      this.User = res;
      if (this.User.newUser) this.openDialog();
    });
    this.orderService.getCustomerLatestOrder().subscribe((res) => {
      console.log(res);
      if (res.orderStatus === 'retake_needed') {
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
