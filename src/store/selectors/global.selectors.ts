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

export const selectAllCities = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.allCities
);

export const selectActiveCities = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.activeCities
);

export const selectLastAddedCity = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.lastAddedCity
);

export const selectLastRemovedCity = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.lastRemovedCity
);

export const selectUniformData = createSelector(
  selectGlobalState,
  (state: GlobalState) => {
    return { buyData: state.unifiedBuyData, rentData: state.unifiedRentData };
  }
);

export const selectUniformBuyData = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.unifiedBuyData
);

export const selectUniformRentData = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.unifiedRentData
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
