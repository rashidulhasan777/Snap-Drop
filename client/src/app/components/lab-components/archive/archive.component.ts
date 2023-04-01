import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Output,
  Inject,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
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
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements AfterViewInit, OnInit {
  orders: any[] = [];
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

  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private loading: LoaderService
  ) {
    this.loading.setLoadingMsg('');
    this.loading.setLoading(true);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    // this.onArchive.emit();
    const orders = this.orderService
      .getOrdersbyStatus('readyToDeliver')
      .subscribe((response) => {
        // console.log(response);
        this.readyOrders = response;

        this.orderService
          .getOrdersbyStatus('handedOver')
          .subscribe((response2) => {
            // console.log(response);
            this.handedOrders = response2;
            this.orders = [...this.readyOrders, ...this.handedOrders];
            // console.log(this.orders);
            this.dataSource = new MatTableDataSource(this.orders);
            this.paginator.length = this.orders.length;
            this.dataSource.paginator = this.paginator;
            this.loading.setLoading(false);
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

  sortData(sort: Sort) {
    const data = this.orders.slice();
    if (!sort.active || sort.direction === '') {
      this.orders = data;
      return;
    }
    this.orders = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'order_id':
          return this.compare(a.order_id, b.order_id, isAsc);
        case 'createDate':
          return this.compare(a.createdAt, b.createdAt, isAsc);
        case 'dispatchDate':
          return this.compare(a.createdAt, b.createdAt, isAsc);
        case 'orderStatus':
          return this.compare(a.orderStatus!, b.orderStatus!, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.paginator = this.paginator;
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  handlePageEvent(e: PageEvent) {
    this.dataSource.paginator = this.paginator;
  }
}
