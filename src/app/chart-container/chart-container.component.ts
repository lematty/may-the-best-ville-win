import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCountry, selectChartType, selectMetric, selectCities, selectUniformData, selectChartOptions } from '../../store/selectors/global.selectors';
import * as fromActions from '../../store/actions';
import { Observable } from 'rxjs';
import { AllCitiesList, Country, UniversalMetrics, UniversalListingProperties } from '../../../models';
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
  public selectedMetric$: Observable<UniversalMetrics> = this.store.select(selectMetric);
  public unifiedData$: Observable<UniversalListingProperties[]> = this.store.select(selectUniformData);
  public chartType$: Observable<ChartType> = this.store.select(selectChartType);
  public options$: Observable<ChartOptions> = this.store.select(selectChartOptions);
  public datasets: ChartDataSets[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.chartType$.subscribe(chartType => this.formatByChartType(chartType));
  }

  formatByChartType(chartType: ChartType) {
    switch (chartType) {
      case 'bar':
        break;
      case 'pie':
        break;
      case 'scatter':
        // this.formatScatterChartDatasets();
        break;
      default:
        break;
    }
  }

  // formatScatterChartDatasets() {
  //   this.datasets = [{
  //     label: listing
  //     data: .map(listing: UniversalBuyListingProperties) => {
  //       label: listing.city,
  //       data: 
  //     } as ChartDataSets;
  //   }];

  // }

}
