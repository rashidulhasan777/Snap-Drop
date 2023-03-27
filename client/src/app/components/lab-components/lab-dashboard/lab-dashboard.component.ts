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
// import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
// import { BaseChartDirective } from 'ng2-charts';
// import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { OrderService } from 'src/app/services/orders/order.service';
import { Order } from './../../../interfaces/order.interface';

@Component({
  selector: 'app-lab-dashboard',
  templateUrl: './lab-dashboard.component.html',
  styleUrls: ['./lab-dashboard.component.css']
})
export class LabDashboardComponent implements AfterViewInit, OnInit{
  
  chartData:number[] = [0, 0, 0, 9, 0, 0, 0];
  // ---------------------------------------
  orders: Order[] = [];
  opened: boolean = true;
  displayedColumns: string[] = [
    'labId',
    'orderStatus',
    'instruction',
    'button',
  ];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource(this.orders);

  constructor(private orderService: OrderService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    const orders = this.orderService
      .getOrdersbyLabId()
      .subscribe((response) => {
        console.log(response);
        this.orders = response;
        if(new Date().getDate()-new Date(this.orders[0].createdAt || '').getDate() ==1) this.chartData[1]++;
        console.log(new Date().getDate()-new Date(this.orders[0].createdAt || '').getDate())
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
