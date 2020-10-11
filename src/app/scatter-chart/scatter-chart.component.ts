import { Component, OnChanges, OnDestroy, Input, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions, ChartTooltipItem } from 'chart.js';
import { ChartService } from '../../services';
import { ActiveCity, Country, UniversalMetrics } from '../../../models';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/models';
import { Observable } from 'rxjs';
import { selectLastUpdatedCity } from '../../store/selectors';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.less']
})
export class ScatterChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() title: string;
  @Input() datasets: ChartDataSets[];
  @Input() cityList: string[];
  @Input() lastUpdatedCity: ActiveCity;
  @Input() xAxisMetric: UniversalMetrics;
  @Input() yAxisMetric: UniversalMetrics;
  @Input() country: Country;
  @Input() options: ChartOptions;
  @ViewChild('chart') chartElementRef: ElementRef;

  chart: Chart;

  constructor(private chartService: ChartService, private store: Store<AppState>) { }

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.datasets && changes.datasets.currentValue && this.chart) {
      console.log('UPDATING....')
      this.chartService.addData(this.chart, this.datasets, this.lastUpdatedCity.color);
      // this.chartService.updateDatasets(this.chart, this.datasets);
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
