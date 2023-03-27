import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/orders/order.service';
import { Order } from 'src/app/interfaces/order.interface';
import { Router } from '@angular/router';
// import { MatStepper } from '@angular/material/stepper';
// import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css'],
})
export class OrderStatusComponent implements OnInit {
  // user?: User;
  step: number = 0;
  order!: Order;
  // status =0;
  // approved: boolean = true;
  // printing: boolean = true;
  // readyToDeliver: boolean = true;
  // @ViewChild('stepper') private myStepper!: MatStepper;

  constructor(private orderService: OrderService, private router: Router) {}
  // firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  // secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});

  ngOnInit() {
    // const user = this.userService.getUser().subscribe((response)=> {
    //   this.user= response;
    // })
    const userOrder = this.orderService
      .getCustomerLatestOrder()
      .subscribe((response) => {
        this.order = response;
        console.log('order Status:', this.order.orderStatus);
        switch (this.order.orderStatus) {
          case 'pending':
            this.step = 0;
            break;
          case 'approved':
            this.step = 1;
            break;
          case 'printing':
            this.step = 2;
            break;
          case 'readyToDeliver':
            this.step = 3;
            break;
          default:
            this.step = 0;
            break;
        }
        // if(this.order.orderStatus == "retake_needed"){
        //   this.retake_needed=true;
        // };
        //   if(this.order.orderStatus == "pending"){
        //     this.status=0;
        //     this.approved = false;
        //     this.printing = false;
        //     this.readyToDeliver = false;
        //   };
        //   if(this.order.orderStatus == "approved"){
        //     // this.approved = true;
        //     this.printing = false;
        //     this.readyToDeliver = false;
        //     this.status=1;
        //     this.myStepper.next();
        //   };
        //   if(this.order.orderStatus == "printing"){
        //     this.status=2;
        //     // this.approved = true;
        //     // this.printing = true;
        //     this.readyToDeliver = false;
        //     this.myStepper.next();
        //     this.myStepper.next();
        //     this.myStepper.selectedIndex = 2
        //   };
        //   if(this.order.orderStatus == "readyToDeliver"){
        //     this.status=3;
        //     this.myStepper.next();
        //     this.myStepper.next();
        //     this.myStepper.next();
        //     // this.approved = true;
        //     // this.printing = true;
        //     // this.readyToDeliver = true;
        //   };
        //   // console.log(this.status)
      });
  }
  goBack() {
    this.router.navigate(['user_dashboard']);
  }
}
