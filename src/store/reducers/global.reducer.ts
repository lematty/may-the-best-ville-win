import { createReducer, on, Action } from '@ngrx/store';
import {
  AllCitiesList,
  Country,
  GraphType,
  UniversalBuyListingProperties,
  UniversalMetrics
} from '../../../models';
import * as fromActions from '../actions/actions';

export interface GlobalState {
  selectedCountry: Country;
  selectedMetric: UniversalMetrics;
  graphType: GraphType;
  selectedCities: AllCitiesList[];
  uniformData: UniversalBuyListingProperties[];
}

export const initialState: GlobalState = {
  selectedCountry: Country.France,
  selectedMetric: UniversalMetrics.Price,
  graphType: 'scatter',
  selectedCities: [],
  uniformData: [],
};

const globalReducer = createReducer(
  initialState,
  on(fromActions.updateCountry, (state, { country }) => ({ ...state, selectedCountry: country })),
  on(fromActions.updateSelectedMetric, (state, { selectedMetric }) => ({ ...state, selectedMetric })),
  on(fromActions.updateGraphType, (state, { graphType }) => ({ ...state, graphType })),

  on(fromActions.addCity, (state, { city }) => ({ ...state, selectedCities: [ ...state.selectedCities, city] })),
  on(fromActions.removeCity, (state, { city }) => ({ ...state, selectedCities: [ city, ...state.selectedCities] })),
  on(fromActions.addUnifiedDataToStore, (state, { unifiedData }) => ({ ...state, uniformData: unifiedData })),

);

export function reducer(state: GlobalState | undefined, action: Action) {
  return globalReducer(state, action);
}
