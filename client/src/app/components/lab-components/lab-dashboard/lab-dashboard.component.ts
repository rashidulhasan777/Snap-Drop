import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
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
    'order_id',
    'orderStatus',
    'gallery',
    'passport',
  ];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource(this.orders);

  constructor(private orderService: OrderService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    const orders = this.orderService
      .getOrdersbyLabId()
      .subscribe((response) => {
        // console.log(response[0].labId);
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
        case 'orderStatus':
          return this.compare(a.orderStatus!, b.orderStatus!, isAsc);
        case 'gallery':
          return this.compare(
            a.galleryPictures!.length,
            b.galleryPictures!.length,
            isAsc
          );
        case 'passport':
          return this.compare(
            a.passportPictures!.length,
            b.passportPictures!.length,
            isAsc
          );
        default:
          return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.orders);
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getPhotosByType(type: string) {
    console.log(this.orders);
  }
}
