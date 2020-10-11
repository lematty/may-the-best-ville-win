import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectActiveCities,
  selectCountry,
  selectChartType,
  selectChartOptions,
  selectAxesMetrics,
  selectBuyChartDatasets,
  selectLastAddedCity,
  selectRentChartDatasets,
  selectLastRemovedCity,
} from '../../store/selectors/global.selectors';
import { Observable } from 'rxjs';
import { ActiveCity, Country, UniversalMetrics } from '../../../models';
import { AppState } from '../../store/models';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.less']
})
export class ChartContainerComponent implements OnInit {
  public country$: Observable<Country> = this.store.select(selectCountry);
  public activeCities$: Observable<ActiveCity[]> = this.store.select(selectActiveCities);
  public lastAddedCity$: Observable<ActiveCity> = this.store.select(selectLastAddedCity);
  public lastRemovedCity$: Observable<string> = this.store.select(selectLastRemovedCity);
  public axesMetrics$: Observable<{
    xAxisMetric: UniversalMetrics,
    yAxisMetric: UniversalMetrics,
  }> = this.store.select(selectAxesMetrics);
  public chartType$: Observable<ChartType> = this.store.select(selectChartType);
  public options$: Observable<ChartOptions> = this.store.select(selectChartOptions);
  public buyDatasets$: Observable<ChartDataSets[]> = this.store.select(selectBuyChartDatasets);
  public rentDatasets$: Observable<ChartDataSets[]> = this.store.select(selectRentChartDatasets);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }
}
