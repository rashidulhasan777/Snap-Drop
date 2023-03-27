import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { OrderService } from 'src/app/services/orders/order.service';
import { Order } from './../../../interfaces/order.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input()chartData:number[] = [0, 0, 0, 0, 0, 0, 0];
  // chartData2:number[] = [0, 0, 0, 0, 0, 0, 0];
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [ 'Today', 'Yesterday', '3 days ago', '4 days ago', '5 days ago', '6 days ago', '7 days ago' ],
    datasets: [
      { data : this.chartData, label: 'Daily Incoming Orders' },
      // { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();
  }
  ngOnInit() {
    const orders = this.orderService
      .getOrdersbyLabId()
      .subscribe((response) => {
        this.orders = response;
        if(new Date().getDate()-new Date(this.orders[0].createdAt || '').getDate() ==1) this.chartData[0]++;
        if(new Date().getDate()-new Date(this.orders[0].createdAt || '').getDate() ==1) this.chartData[1]++;
        if(new Date().getDate()-new Date(this.orders[0].createdAt || '').getDate() ==1) this.chartData[2]++;
        if(new Date().getDate()-new Date(this.orders[0].createdAt || '').getDate() ==1) this.chartData[3]++;
        console.log(new Date().getDate()-new Date(this.orders[0].createdAt || '').getDate())
      })
  }
}
