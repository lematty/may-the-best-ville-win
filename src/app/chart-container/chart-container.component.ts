import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCountry, selectChartType, selectMetric, selectCities, selectUniformData, selectChartOptions, selectChartDatasets } from '../../store/selectors/global.selectors';
import * as fromActions from '../../store/actions';
import { Observable } from 'rxjs';
import { AllCitiesList, Country, UniversalMetrics, UniversalListingProperties } from '../../../models';
import { AppState } from '../../store/models';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.less']
})
export class ChartContainerComponent implements OnInit {
  public country$: Observable<Country> = this.store.select(selectCountry);
  public selectedCities$: Observable<AllCitiesList[]> = this.store.select(selectCities);
  public selectedMetric$: Observable<UniversalMetrics> = this.store.select(selectMetric);
  public unifiedData$: Observable<UniversalListingProperties[]> = this.store.select(selectUniformData);
  public chartType$: Observable<ChartType> = this.store.select(selectChartType);
  public options$: Observable<ChartOptions> = this.store.select(selectChartOptions);
  public datasets$: Observable<ChartDataSets[]> = this.store.select(selectChartDatasets);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }
}
