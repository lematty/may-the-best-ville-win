import { createSelector } from '@ngrx/store';
import { Country, PaymentType, UniversalMetrics } from '../../../models';
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

export const selectXAxisMetric = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.xAxisMetric
);

export const selectYAxisMetric = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.yAxisMetric
);

export const selectAxesMetrics = createSelector(
  selectXAxisMetric,
  selectYAxisMetric,
  (xAxisMetric: UniversalMetrics, yAxisMetric: UniversalMetrics) => {
    return { xAxisMetric, yAxisMetric };
  }
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

export const selectChartTitle = createSelector(
  selectCountry,
  selectPaymentType,
  (country: Country, paymentType: PaymentType) => `${country.toUpperCase()} - ${paymentType.toUpperCase()}`
);
