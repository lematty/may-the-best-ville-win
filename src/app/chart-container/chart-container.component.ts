import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectActiveCities,
  selectAxesMetrics,
  selectBuyChartDatasets,
  selectCountry,
  selectChartType,
  selectChartOptions,
  selectLastAddedCity,
  selectLastRemovedCity,
  selectRentChartDatasets,
} from '../../store/selectors/global.selectors';
import { Observable } from 'rxjs';
import { ActiveCity, Country, UniversalMetrics } from '../../../models';
import { AppState } from '../../store/models';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { CalculationsService } from '../../services';

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

  constructor(private store: Store<AppState>, private calculationsService: CalculationsService) { }

  ngOnInit(): void {
  }

  getBuyEstimationForStudio(cost: number) {
    const totalPrice = this.getEstimatedTotalCost(cost);
    const { monthlyPayment } = this.calculationsService.calculateInterest(totalPrice, 20, 1.15);
    return monthlyPayment;
  }

  getEstimatedTotalCost(cost: number) {
    return cost * 25;
  }

  getRentEstimationForStudio(cost: number) {
    return this.getEstimatedTotalCost(cost);
  }

  getDifference(value1: number, value2: number) {
    console.log('getDifference()');
    console.log('value1()', value1);
    console.log('value2()', value2);
    return this.getDifference(value1, value2);
  }

  isPositiveIncome(monthlyMortgage: number, monthlyRent: number): boolean {
    return monthlyMortgage < monthlyRent;
  }
}
