import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSidenav } from '@angular/material/sidenav';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogApprovalComponent } from '../dialog-approval/dialog-approval.component';

import { OrderService } from 'src/app/services/orders/order.service';
import { Order } from './../../../interfaces/order.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements AfterViewInit, OnInit {
  orders: Order[] = [];
  readyOrders: Order[] = [];
  handedOrders: Order[] = [];
  opened: boolean = true;
  displayedColumns: string[] = [
    'orderId',
    'createDate',
    'dispatchDate',
    'orderStatus',
    'instruction',
    'paid',
    'button',
  ];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource(this.orders);

  constructor(public dialog: MatDialog, private orderService: OrderService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    const orders = this.orderService
      .getOrdersbyStatus('readyToDeliver')
      .subscribe((response) => {
        // console.log(response);
        this.readyOrders = response.map((el) => {
          const created = moment(el.createdAt).format('MMM DD');
          const updated = moment(el.updatedAt).format('MMM DD');
          // console.log(created);
          el['createdAt'] = created;
          el['updatedAt'] = updated;
          // console.log(el);
          return el;
        });

        this.orderService
          .getOrdersbyStatus('handedOver')
          .subscribe((response) => {
            // console.log(response);
            this.handedOrders = response.map((el2) => {
              const created = moment(el2.createdAt).format('MMM DD');
              const updated = moment(el2.updatedAt).format('MMM DD');
              // console.log(created);
              el2['createdAt'] = created;
              el2['updatedAt'] = updated;
              // console.log(el);
              return el2;
            });
            this.orders = [...this.readyOrders, ...this.handedOrders];
            console.log(this.orders);
            this.dataSource = new MatTableDataSource(this.orders);
          });
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handOver(order_id: string) {
    console.log(order_id);
    this.orderService
      .changeOrderStatus(order_id, { orderStatus: 'handedOver' })
      .subscribe((res) => {
        // console.log(res);
        this.ngOnInit();
      });
  }
}
