import { createSelector } from '@ngrx/store';
import { UniversalMetrics } from '../../../models';
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

export const selectCities = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.selectedCities
);

export const selectUniformBuyData = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.uniformBuyData
);

export const selectUniformRentData = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.uniformBuyData
);

export const selectBuyChartDatasets = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.buyChartDatasets
);

export const selectRentChartDatasets = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.rentChartDatasets
);

export const selectChartOptions = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.chartOptions
);
