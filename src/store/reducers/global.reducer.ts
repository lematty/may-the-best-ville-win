import { createReducer, on, Action } from '@ngrx/store';
import { Country, PaymentType, UniversalMetrics } from '../../../models';
import * as fromActions from '../actions';
import { GlobalState } from '../models';

export const initialState: GlobalState = {
  selectedCountry: Country.France,
  chartType: 'scatter',
  paymentType: PaymentType.Buy,
  selectedCities: [],
  uniformData: [],
  chartDatasets: [],
  chartOptions: {},
  xAxisMetric: UniversalMetrics.Price,
  yAxisMetric: UniversalMetrics.SurfaceArea,
};

const globalReducer = createReducer(
  initialState,
  on(fromActions.updateCountry, (state, { country }) => ({ ...state, selectedCountry: country })),
  on(fromActions.updatePaymentType, (state, { paymentType }) => ({ ...state, paymentType })),
  on(fromActions.updateChartType, (state, { chartType }) => ({ ...state, chartType })),

  on(fromActions.updateXAxisMetric, (state, { xAxisMetric }) => ({ ...state, xAxisMetric })),
  on(fromActions.updateYAxisMetric, (state, { yAxisMetric }) => ({ ...state, yAxisMetric })),

  on(fromActions.addCity, (state, { city }) => ({ ...state, selectedCities: [...state.selectedCities, city] })),
  on(fromActions.removeCity, (state, { city }) => ({ ...state, selectedCities: [city, ...state.selectedCities] })),
  on(fromActions.addUnifiedDataToStore, (state, { unifiedData }) => ({ ...state, uniformData: unifiedData })),
  on(fromActions.addChartDataset, (state, { dataset }) => ({ ...state, chartDatasets: [...state.chartDatasets, dataset] })),
  on(fromActions.addChartDatasets, (state, { datasets }) => ({ ...state, chartDatasets: datasets })),
  on(fromActions.removeChartDataset, (state, { dataset }) => ({ ...state, chartDatasets: [dataset, ...state.chartDatasets] })),
);

export function reducer(state: GlobalState | undefined, action: Action) {
  return globalReducer(state, action);
}
