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
  styleUrls: ['./lab-dashboard.component.css'],
})
export class LabDashboardComponent implements AfterViewInit, OnInit {
  chartData: number[] = [];
  sentForDelivery: number[] = [];
  maxBar: number = 0;

  monthlyOrdersData: number[] = [];
  monthlyDeliveredData: number[] = [];
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
        console.log(response[0].labId);
        this.orders = response;
        this.dataSource = new MatTableDataSource(this.orders);

        const arr = [0, 0, 0, 0, 0, 0, 0];
        const arr2 = [0, 0, 0, 0, 0, 0, 0];

        const monthArr = [];
        const monthArr2 = [];

        for (let i = 0; i < 30; ++i) monthArr.push(0);
        for (let i = 0; i < 30; ++i) monthArr2.push(0);

        for (let i = 0; i < response.length; i++) {
          const gap =
            new Date().getDate() -
            new Date(this.orders[i].createdAt || '').getDate();
          if (gap < 6) {
            arr[gap]++;
            if (this.orders[i].orderStatus === 'readyToDeliver') {
              arr2[gap]++;
            }
          }

          const monthGap =
            new Date().getDate() -
            new Date(this.orders[i].updatedAt || '').getDate();
          if (monthGap < 31) {
            monthArr[monthGap]++;
            if (this.orders[i].orderStatus === 'readyToDeliver') {
              monthArr2[monthGap]++;
            }
          }
        }

        this.chartData = [...arr];
        this.sentForDelivery = [...arr2];

        this.maxBar = Math.max(...this.chartData) + 2;

        // console.log(this.maxBar); //works

        this.monthlyOrdersData = [...monthArr].reverse();
        this.monthlyDeliveredData = [...monthArr2].reverse();
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

  getPhotosByType(type: string) {
    console.log(this.orders);
  }
}
