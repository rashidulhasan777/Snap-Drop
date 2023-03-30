import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { OrderService } from 'src/app/services/orders/order.service';
import { Order } from './../../interfaces/order.interface';

// import { default as Annotation } from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() chartData!: number[];
  @Input() chartData2!: number[];
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
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
        text: 'Monthly orders time series',
        font: {
          size: 20,
        },
      },
    },
  };
  public barChartType: ChartType = 'line';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'line'> = {
    labels: [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
    ].reverse(),
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
    // console.log(event, active);
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
