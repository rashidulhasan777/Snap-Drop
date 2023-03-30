import { Component, ViewChild, Input } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  // @Input() chartData!: number[];
  // @Input() chartLabels!: string[][];
  // @Input() chartTitle!: string;

  orderCountByProductCategory: number[] = [];
  productCategories: string[][] = [];
  chartTitle: string = 'Orders by photo type';

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      title: {
        display: true,
        text: this.chartTitle,
        font: {
          size: 20,
        },
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  public pieChartData!: ChartData<'doughnut', number[], string | string[]>;
  public pieChartType: ChartType = 'doughnut';
  public pieChartPlugins = [DatalabelsPlugin];

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  addSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.push(['Line 1', 'Line 2', 'Line 3']);
    }

    this.pieChartData.datasets[0].data.push(400);

    this.chart?.update();
  }

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.chart?.update();
  }

  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position =
        this.pieChartOptions.plugins.legend.position === 'left'
          ? 'top'
          : 'left';
    }

    this.chart?.render();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display =
        !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrderCountByProductCategory().subscribe((res) => {
      this.orderCountByProductCategory = Object.values(res.stat);
      const categories = Object.keys(res.stat);
      this.productCategories = categories.map((el) => [el]);
      // console.log(this.orderCountByProductCategory);
      this.pieChartData = {
        // labels: this.chartLabels,
        labels: [['4R'], ['6R'], ['8R'], ['10R'], ['Passport']],
        datasets: [
          {
            data: this.orderCountByProductCategory,
          },
        ],
      };
    });
  }
}
