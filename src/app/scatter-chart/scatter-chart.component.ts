import { Component, OnChanges, OnDestroy, OnInit, Input, SimpleChanges } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/models';
import { ChartService } from '../../services';
import { Country } from '../../../models';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.less']
})
export class ScatterChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() title: string;
  @Input() datasets: ChartDataSets[];
  @Input() country: Country;
  @Input() options: ChartOptions;

  chart: Chart;

  constructor(private store: Store<AppState>, private chartService: ChartService) { }

  ngOnInit(): void {
    this.buildChart();
  }

  buildChart() {
    this.chart = new Chart('myChart', {
      type: 'scatter',
      data: {
        datasets: [],
      },
      options: {
        title: {
          display: true,
          text: this.title || ''
        },
        tooltips: {
          callbacks: {
            label: ((tooltipItem: ChartTooltipItem) => {
              return ` ${this.chartService.formatCurrency(this.country, Number(tooltipItem.xLabel))} - ` +
                `${this.chartService.formatSurfaceArea(this.country, tooltipItem.yLabel)}`;
            })
          }
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
      // options: this.options,
    });
  }

  updateDatasets() {
    this.chartService.removeData(this.chart);
    this.addData();
  }

  addData() {
    this.datasets.forEach((dataset: ChartDataSets) => {
      this.chart.data.datasets.push({
        label: dataset.label,
        data: dataset.data,
        backgroundColor: this.chartService.getRandomColor()
      });
    });
    this.chart.update();
    console.log(this.chart);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.datasets && changes.datasets.currentValue && this.chart) {
      this.updateDatasets();
    }
    if (changes.title && changes.title.currentValue && this.chart) {
      this.chartService.updateTitle(this.chart, this.title);
    }
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
