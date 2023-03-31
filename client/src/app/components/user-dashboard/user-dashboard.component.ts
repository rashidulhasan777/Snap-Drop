import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/orders/order.service';
import { MatDialog } from '@angular/material/dialog';
import { OnboardingComponent } from '../onboarding/onboarding.component';
import { UserdataService } from 'src/app/services/userdata/userdata.service';
import { User } from 'src/app/interfaces/user.interface';
import { Socket } from 'ngx-socket-io';
import { Order } from 'src/app/interfaces/order.interface';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  order?: Order;
  User!: User;
  firstName: string = '';
  constructor(
    private orderService: OrderService,
    private userData: UserdataService,
    private router: Router,
    public dialog: MatDialog,
    private socket: Socket,
    private loading: LoaderService
  ) {
    this.loading.setLoadingMsg('');
    this.loading.setLoading(true);
  }

  ngOnInit() {
    this.userData.getUser().subscribe((res) => {
      this.User = res;
      this.socket.emit('gimmeNotification', { userId: res._id });
      this.socket.on;
      let fullname = this.User.name.split(' ');
      this.firstName = fullname[0];
      if (this.User.newUser) this.openDialog();
      this.orderService.getCustomerLatestOrder().subscribe((res) => {
        console.log(res);
        if (res && res.orderStatus === 'retake_needed') {
          this.router.navigate(['retake']);
        }
        this.order = res;
        this.loading.setLoading(false);
      });
    });
  }

  goTimeline() {
    this.router.navigate(['order-status']);
  }
  openDialog() {
    const dialogRef = this.dialog.open(OnboardingComponent);
    dialogRef.afterClosed().subscribe((res) => {
      this.userData.setUserNotNew().subscribe();
    });
  }
}
