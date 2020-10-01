import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCountry, selectGraphType, selectMetric, selectSelectedCities } from '../../store/selectors/selectors';
import { State } from '../../store/reducers/reducer';
import * as fromActions from '../../store/actions/actions';
import * as fromFranceActions from '../../store/actions/france.actions';
import { Observable } from 'rxjs';
import { Country, UniversalMetrics, GraphType } from '../../../models';
import { AllCitiesList } from '../../../models/universal.model';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.less']
})
export class ChartContainerComponent implements OnInit {
  public country$: Observable<Country> = this.store.select(selectCountry);
  public selectedCities$: Observable<AllCitiesList[]> = this.store.select(selectSelectedCities);
  public selectedMetric$: Observable<UniversalMetrics> = this.store.select(selectMetric);
  public graphType$: Observable<GraphType> = this.store.select(selectGraphType);

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(fromFranceActions.fetchFranceBuyData());
  }

  changeCountry(country: Country) {
    this.store.dispatch(fromActions.updateCountry({ country }));
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

  changeGraphType(graph: GraphType) {
    this.store.dispatch(fromActions.updateGraphType({ graphType: graph }));
  }

}
