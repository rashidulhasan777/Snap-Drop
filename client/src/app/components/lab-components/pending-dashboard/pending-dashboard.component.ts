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
import { ImageInterface } from 'src/app/interfaces/image.interface';

@Component({
  selector: 'app-pending-dashboard',
  templateUrl: './pending-dashboard.component.html',
  styleUrls: ['./pending-dashboard.component.css'],
})
export class PendingDashboardComponent implements AfterViewInit, OnInit {
  orders: Order[] = [];
  name: string = '';
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

  openDialog(order: Order): void {
    const dialogRef = this.dialog.open(DialogApprovalComponent, {
      data: order,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    const orders = this.orderService
      .getOrdersbyStatus('pending')
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
