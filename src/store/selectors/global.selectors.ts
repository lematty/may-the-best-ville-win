import { createSelector } from '@ngrx/store';
import { AppState, GlobalState } from '../models';

export const selectGlobalState = (state: AppState) => state.globalState;

export const selectCountry = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.selectedCountry
);

export const selectChartType = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.chartType
);

export const selectXAxisMertic = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.xAxisMertic
);

export const selectYAxisMertic = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.yAxisMertic
);

export const selectPaymentType = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.paymentType
);

export const selectCities = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.selectedCities
);

export const selectUniformData = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.uniformData
);

export const selectChartDatasets = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.chartDatasets
);

export const selectChartOptions = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.chartOptions
);
