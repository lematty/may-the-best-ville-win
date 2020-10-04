import { createReducer, Action, on } from '@ngrx/store';
import * as fromFranceActions from '../actions/france.actions';
import { FranceState } from '../models';

export const initialFranceState: FranceState = {
  franceBuyJsonData: [],
  franceRentJsonData: [],
};

const franceReducer = createReducer(
  initialFranceState,
  on(fromFranceActions.addFranceBuyData, (state, { data }) => ({ ...state, franceBuyJsonData: data })),
  on(fromFranceActions.addFranceRentData, (state, { data }) => ({ ...state, franceRentJsonData: data })),
);

export function reducer(state: FranceState | undefined, action: Action) {
  return franceReducer(state, action);
}
