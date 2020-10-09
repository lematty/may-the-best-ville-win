import { Component, OnChanges, OnDestroy, Input, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { ChartService } from '../../services';
import { Country, UniversalMetrics } from '../../../models';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.less']
})
export class ScatterChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() title: string;
  @Input() datasets: ChartDataSets[];
  @Input() xAxisMetric: UniversalMetrics;
  @Input() yAxisMetric: UniversalMetrics;
  @Input() country: Country;
  @Input() options: ChartOptions;
  @ViewChild('chart') chartElementRef: ElementRef;

  chart: Chart;

  constructor(private chartService: ChartService) { }

  ngAfterViewInit(): void {
    this.buildChart();
  }

  buildChart() {
    const context = this.chartElementRef.nativeElement;
    this.chart = new Chart(context, {
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
              const xAxis = this.chartService.formatLabel(this.country, this.xAxisMetric, tooltipItem.xLabel);
              const yAxis = this.chartService.formatLabel(this.country, this.yAxisMetric, tooltipItem.yLabel);
              return ` ${xAxis} - ${yAxis}`;
            })
          }
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
              beginAtZero: true,
              callback: (value) => this.chartService.formatLabel(this.country, this.xAxisMetric, value),
            },
            scaleLabel: {
              display: true,
              labelString: this.xAxisMetric,
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: (value) => this.chartService.formatLabel(this.country, this.yAxisMetric, value),
            },
            scaleLabel: {
              display: true,
              labelString: this.yAxisMetric,
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
    if (
      ((changes.xAxisMetric && changes.xAxisMetric.currentValue)
      || (changes.yAxisMetric && changes.yAxisMetric.currentValue))
      && !!this.chart
    ) {
      this.chartService.updateAxisTitles(this.chart, this.xAxisMetric, this.yAxisMetric);
    }
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
