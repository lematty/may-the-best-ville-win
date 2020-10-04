import { createSelector } from '@ngrx/store';
import { AppState, UsState } from '../models';

export const selectUsState = (state: AppState) => state.usState;

export const selectUsBuyJsonData = createSelector(
  selectUsState,
  (state: UsState) => state.usBuyJsonData,
);
export const selectUsRentJsonData = createSelector(
  selectUsState,
  (state: UsState) => state.usRentJsonData,
);
