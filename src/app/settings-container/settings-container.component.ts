import { Component, OnInit } from '@angular/core';
import { ActiveCity, Country, UniversalMetrics } from '../../../models';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/models';
import * as fromActions from '../../store/actions';
import { ChartType } from 'chart.js';
import { Observable } from 'rxjs';
import { selectAllCities, selectAxesMetrics, selectChartType, selectActiveCities } from '../../store/selectors';
import { ChartService } from '../../services';

@Component({
  selector: 'app-settings-container',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.less']
})
export class SettingsContainerComponent implements OnInit {
  public allCities$: Observable<string[]> = this.store.select(selectAllCities);
  public activeCities$: Observable<ActiveCity[]> = this.store.select(selectActiveCities);
  public chartTypes: ChartType[] = ['bar', 'bubble', 'doughnut', 'horizontalBar', 'line', 'pie', 'polarArea', 'radar', 'scatter'];
  public countries = [Country.France, Country.Us];
  public axisOptions = [
    UniversalMetrics.NumberOfBedrooms,
    UniversalMetrics.NumberOfRooms,
    UniversalMetrics.PostalCode,
    UniversalMetrics.Price,
    UniversalMetrics.SurfaceArea
  ];
  public axesMetrics$: Observable<{
    xAxisMetric: UniversalMetrics,
    yAxisMetric: UniversalMetrics,
  }> = this.store.select(selectAxesMetrics);
  public selectedChartType$ = this.store.select(selectChartType);
  public selectedXMetric = UniversalMetrics.Price;
  public selectedYMetric = UniversalMetrics.SurfaceArea;
  public selectedChartType: ChartType = 'scatter';
  public activeCitiesList: ActiveCity[] = [];

  constructor(private store: Store<AppState>, private chartService: ChartService) { }

  ngOnInit(): void {
    this.store.dispatch(fromActions.initialSetup());
    this.axesMetrics$.subscribe((axes) => {
      this.selectedXMetric = axes.xAxisMetric;
      this.selectedYMetric = axes.yAxisMetric;
    });
    this.selectedChartType$.subscribe((chartType: ChartType) => {
      this.selectedChartType = chartType;
    });
    this.activeCities$.subscribe(cities => {
      this.activeCitiesList = cities;
    });
  }

  updateChartType(chart: ChartType) {
    this.store.dispatch(fromActions.updateChartType({ chartType: chart }));
  }

  updateCountry(country: Country) {
    this.store.dispatch(fromActions.updateCountry({ country }));
  }

  updateActiveCitiesList(city: string) {
    const foundCity = this.activeCitiesList.find(activeCity => activeCity.city === city);
    foundCity ? this.removeCity(city) : this.addCity(city);
  }

  addCity(city: string) {
    const color = this.chartService.getRandomColor();
    this.store.dispatch(fromActions.addCity({ city, color }));
  }

  removeCity(city: string) {
    this.store.dispatch(fromActions.removeCity({ city }));
  }

  updateXAxis(metric: UniversalMetrics) {
    this.store.dispatch(fromActions.updateXAxisMetric({ xAxisMetric: metric }));
  }

  updateYAxis(metric: UniversalMetrics) {
    this.store.dispatch(fromActions.updateYAxisMetric({ yAxisMetric: metric }));
  }
}
