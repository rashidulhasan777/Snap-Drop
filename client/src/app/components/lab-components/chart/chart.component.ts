import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { OrderService } from 'src/app/services/orders/order.service';
import { Order } from './../../../interfaces/order.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() chartData!: number[];
  @Input() chartData2!: number[];
  @Input() maxBar!: number;
  orders: Order[] = [];
  delayed?: any;

  constructor(private orderService: OrderService) {}

  public barChartOptions: ChartConfiguration['options'] = {
    // animation: {
    //   onComplete: () => {
    //     this.delayed = true;
    //   },
    //   delay: (context) => {
    //     // return 10000;
    //   //   let delay = 0;
    //   //   console.log(context)
    //   //   if (
    //   //     context.type === 'data' &&
    //   //     context.mode === 'default' &&
    //   //     !this.delayed
    //   //   ) {
    //   //     delay = context.dataIndex * 3000 + context.datasetIndex * 100;
    //   //   }
    //   //   return delay;
    //   // },
    // },
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
        max: 9,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
      title: {
        display: true,
        text: 'Orders received and delivered',
        font: {
          size: 20,
        },
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: [
      'Today',
      'Yesterday',
      '3 days ago',
      '4 days ago',
      '5 days ago',
      '6 days ago',
      '7 days ago',
    ],
    datasets: [
      { data: this.chartData, label: 'Daily Incoming Orders' },
      { data: this.chartData2, label: 'Sent out for delievery' },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
  }

  ngOnInit() {
    this.barChartData.datasets = [
      { data: this.chartData, label: 'Daily Incoming Orders' },
      { data: this.chartData2, label: 'Sent out for delievery' },
    ];
  }
}
