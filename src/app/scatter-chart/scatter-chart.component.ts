import { Component, OnChanges, OnInit, Input, SimpleChanges } from '@angular/core';
import { Chart, ChartData, ChartDataSets, ChartOptions, ChartPoint } from 'chart.js';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectChartDatasets } from '../../store/selectors';
import { map } from 'rxjs/operators';
import { AppState } from '../../store/models';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.less']
})
export class ScatterChartComponent implements OnInit {
  @Input() title?: string;
  // @Input() datasets: ChartDataSets[];
  @Input() options: ChartOptions;
  chart: Chart;

  datasets$: Observable<ChartDataSets[]> = this.store.select(selectChartDatasets);
  isChartBuilt = false;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.datasets$.subscribe(((datasets: ChartDataSets[]) => this.buildChart(datasets)));
  }

  buildChart(datasets: ChartDataSets[]) {
    console.log('building chart');
    const newDatasets: ChartDataSets[] = datasets.map((dataset: ChartDataSets) => ({
        label: dataset.label,
        data: dataset.data,
    }));
    this.chart = new Chart('myChart', {
      type: 'scatter',
      data: {
        datasets: newDatasets,
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        }
      }
      // options: this.options,
    });
  }
}
