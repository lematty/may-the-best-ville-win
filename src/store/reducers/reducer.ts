import { createReducer, on, Action } from '@ngrx/store';
import {
  AllCitiesList,
  Country,
  GraphType,
  UniversalBuyListingProperties,
  UniversalMetrics
} from '../../../models';
import * as fromActions from '../actions/actions';
import * as fromFranceActions from '../actions/france.actions';
import { FranceState } from './france.reducer';
import { UsState } from './us.reducer';

export interface State {
  selectedCountry: Country;
  selectedMetric: UniversalMetrics;
  graphType: GraphType;
  selectedCities: AllCitiesList[];
  france: FranceState;
  us: UsState;
  uniformData: UniversalBuyListingProperties[];
}

export const initialState: State = {
  selectedCountry: Country.France,
  selectedMetric: UniversalMetrics.Price,
  graphType: 'scatter',
  selectedCities: [],
  france: {
    franceBuyJsonData: [],
    franceRentJsonData: [],
  },
  us: {
    usBuyJsonData: [],
    usRentJsonData: [],
  },
  uniformData: [],
};

const configReducer = createReducer(
  initialState,
  on(fromFranceActions.addFranceBuyData, (state, { data }) => ({ ...state, franceBuyData: data })),
  on(fromActions.updateCountry, (state, { country }) => ({ ...state, selectedCountry: country })),
  on(fromActions.updateSelectedMetric, (state, { selectedMetric }) => ({ ...state, selectedMetric })),
  on(fromActions.updateGraphType, (state, { graphType }) => ({ ...state, graphType })),

  on(fromActions.addCity, (state, { city }) => ({ ...state, selectedCities: [ ...state.selectedCities, city] })),
  on(fromActions.removeCity, (state, { city }) => ({ ...state, selectedCities: [ city, ...state.selectedCities] })),
);

export function reducer(state: State | undefined, action: Action) {
  return configReducer(state, action);
}
