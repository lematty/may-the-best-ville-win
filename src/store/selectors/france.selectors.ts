import { createSelector } from '@ngrx/store';
import { AppState, FranceState } from '../models';

export const selectFranceState = (state: AppState) => state.franceState;

export const selectFranceBuyJsonData = createSelector(
  selectFranceState,
  (state: FranceState) => state.franceBuyJsonData,
);
export const selectFranceRentJsonData = createSelector(
  selectFranceState,
  (state: FranceState) => state.franceRentJsonData,
);
