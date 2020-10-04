import { createReducer, Action, on } from '@ngrx/store';
import * as fromUsActions from '../actions/us.actions';
import { UsState } from '../models';

export const initialUsState: UsState = {
  usBuyJsonData: [],
  usRentJsonData: [],
};

const usReducer = createReducer(
  initialUsState,
  on(fromUsActions.addUsBuyData, (state, { data }) => ({ ...state, usBuyData: data })),
  on(fromUsActions.addUsRentData, (state, { data }) => ({ ...state, usRentData: data })),
);

export function reducer(state: UsState | undefined, action: Action) {
  return usReducer(state, action);
}
