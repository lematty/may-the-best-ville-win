import { FranceBuyListingJsonFormat, UniversalBuyListingProperties } from '../../../models';
import { createReducer, Action, on } from '@ngrx/store';
import * as fromUsActions from '../actions/us.actions';

export interface UsState {
  usBuyJsonData: FranceBuyListingJsonFormat[];
  usRentJsonData: UniversalBuyListingProperties[];
}

export const initialUsState: UsState = {
  usBuyJsonData: [],
  usRentJsonData: [],
};

const usReducer = createReducer(
  initialUsState,
  on(fromUsActions.addUSBuyData, (state, { data }) => ({ ...state, usBuyData: data })),
  on(fromUsActions.addUSRentData, (state, { data }) => ({ ...state, usRentData: data })),
);

export function reducer(state: UsState | undefined, action: Action) {
  return usReducer(state, action);
}
