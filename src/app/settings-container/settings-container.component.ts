import { Component, OnInit } from '@angular/core';
import { AllCitiesList, Country, PaymentType, UniversalMetrics } from '../../../models';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/models';
import * as fromActions from '../../store/actions';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-settings-container',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.less']
})
export class SettingsContainerComponent implements OnInit {
  public chartTypes: ChartType[] = ['bar', 'bubble', 'doughnut', 'horizontalBar', 'line', 'pie', 'polarArea', 'radar', 'scatter'];
  public paymentTypes = [PaymentType.Buy, PaymentType.Rent];
  public countries = [Country.France, Country.Us];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(fromActions.initialSetup());
  }

  updateChartType(chart: ChartType) {
    this.store.dispatch(fromActions.updateChartType({ chartType: chart }));
  }

  updateCountry(country: Country) {
    this.store.dispatch(fromActions.updateCountry({ country }));
  }

  updatePaymentType(paymentType: PaymentType) {
    this.store.dispatch(fromActions.updatePaymentType({ paymentType }));
  }

  addCity(city: AllCitiesList) {
    this.store.dispatch(fromActions.addCity({ city }));
  }

  removeCity(city: AllCitiesList) {
    this.store.dispatch(fromActions.removeCity({ city }));
  }

  changeMetric(metric: UniversalMetrics) {
    this.store.dispatch(fromActions.updateSelectedMetric({ selectedMetric: metric }));
  }
}
