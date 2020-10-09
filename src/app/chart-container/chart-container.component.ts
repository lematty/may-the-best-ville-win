import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCountry,
  selectChartType,
  selectCities,
  selectUniformData,
  selectChartOptions,
  selectChartDatasets,
  selectXAxisMetric,
  selectYAxisMetric, selectPaymentType, selectChartTitle, selectAxesMetrics
} from '../../store/selectors/global.selectors';
import { Observable } from 'rxjs';
import { AllCitiesList, Country, UniversalMetrics, UniversalListingProperties, PaymentType } from '../../../models';
import { AppState } from '../../store/models';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.less']
})
export class ChartContainerComponent implements OnInit {
  public country$: Observable<Country> = this.store.select(selectCountry);
  public selectedCities$: Observable<AllCitiesList[]> = this.store.select(selectCities);
  public axesMetrics$: Observable<{
    xAxisMetric: UniversalMetrics,
    yAxisMetric: UniversalMetrics,
  }> = this.store.select(selectAxesMetrics);
  public unifiedData$: Observable<UniversalListingProperties[]> = this.store.select(selectUniformData);
  public chartType$: Observable<ChartType> = this.store.select(selectChartType);
  public paymentType$: Observable<PaymentType> = this.store.select(selectPaymentType);
  public options$: Observable<ChartOptions> = this.store.select(selectChartOptions);
  public datasets$: Observable<ChartDataSets[]> = this.store.select(selectChartDatasets);
  public chartTitle$: Observable<string> = this.store.select(selectChartTitle);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }
}
