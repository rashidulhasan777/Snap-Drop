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

@Component({
  selector: 'app-printing',
  templateUrl: './printing.component.html',
  styleUrls: ['./printing.component.css'],
})
export class PrintingComponent implements AfterViewInit, OnInit {
  orders: Order[] = [];
  opened: boolean = true;
  displayedColumns: string[] = [
    'labId',
    'orderStatus',
    'instruction',
    'button',
  ];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource(this.orders);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private orderService: OrderService) {}

  ngOnInit() {
    const orders = this.orderService
      .getOrdersbyStatus('printing')
      .subscribe((response) => {
        console.log(response);
        this.orders = response;
        this.dataSource = new MatTableDataSource(this.orders);
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  requestDelivery(id: string) {
    const body = { orderStatus: 'readyToDeliver' };
    const updatedBody = this.orderService
      .changeOrderStatus(id, body)
      .subscribe((response) => {
        console.log(response);
        this.ngOnInit();
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
