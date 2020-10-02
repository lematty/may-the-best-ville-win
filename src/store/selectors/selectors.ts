import { createSelector } from '@ngrx/store';
import { FranceState } from '../reducers/france.reducer';
import { GlobalState } from '../reducers/global.reducer';
import { UsState } from '../reducers/us.reducer';

export interface AppState {
  globalState: GlobalState;
  franceState: FranceState;
  usState: UsState;
}

export const selectFranceState = (state: AppState) => state.franceState;
export const selectUsState = (state: AppState) => state.usState;

export const selectFranceBuyJsonData = createSelector(
  selectFranceState,
  (state: FranceState) => state.franceBuyJsonData,
);
export const selectFranceRentJsonData = createSelector(
  selectFranceState,
  (state: FranceState) => state.franceRentJsonData,
);

export const selectUsBuyJsonData = createSelector(
  selectUsState,
  (state: UsState) => state.usBuyJsonData,
);
export const selectUsRentJsonData = createSelector(
  selectUsState,
  (state: UsState) => state.usRentJsonData,
);

export const selectCountry = (state: AppState) => state.globalState.selectedCountry;
export const selectMetric = (state: AppState) => state.globalState.selectedMetric;
export const selectGraphType = (state: AppState) => state.globalState.graphType;
export const selectSelectedCities = (state: AppState) => state.globalState.selectedCities;
