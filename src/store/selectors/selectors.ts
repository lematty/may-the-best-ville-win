import { createSelector } from '@ngrx/store';
import { AllCitiesList, Country, GraphType, UniversalMetrics } from '../../../models';


export interface AppState {
  selectedCountry: Country;
  selectedMetric: UniversalMetrics;
  graphType: GraphType;
  selectedCities: AllCitiesList[];
}

export const selectCountry = (state: AppState) => state.selectedCountry;
export const selectMetric = (state: AppState) => state.selectedMetric;
export const selectGraphType = (state: AppState) => state.graphType;
export const selectSelectedCities = (state: AppState) => state.selectedCities;
