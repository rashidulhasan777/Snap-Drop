import { AfterViewInit, Component,OnInit ,ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSidenav } from '@angular/material/sidenav';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogApprovalComponent } from '../dialog-approval/dialog-approval.component';

import { OrderService } from 'src/app/services/orders/order.service';
import { Order } from './../../../interfaces/order.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements AfterViewInit, OnInit {
  orders : Order[] =[];
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  animal: string = '';
  name: string = '';
  isShowing = false;
  // events: string[] = [];
  opened: boolean = true;
  
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogApprovalComponent, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }


  displayedColumns: string[] = ['labId', 'orderStatus', 'instruction', 'button'];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource(this.orders);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private orderService : OrderService) {

    // Assign the data to the data source for the table to render
  }
  
  ngOnInit(){
    const orders = this.orderService.getOrdersbyStatus("approved").subscribe((response) => {
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
