import { createReducer, on, Action } from '@ngrx/store';
import { ActiveCity, Country, UniversalMetrics } from '../../../models';
import * as fromActions from '../actions';
import { GlobalState } from '../models';

export const initialState: GlobalState = {
  selectedCountry: Country.France,
  chartType: 'scatter',
  allCities: [],
  activeCities: [],
  lastAddedCity: {} as ActiveCity,
  lastRemovedCity: '',
  unifiedBuyData: [],
  unifiedRentData: [],
  buyChartDatasets: [],
  rentChartDatasets: [],
  chartOptions: {},
  xAxisMetric: UniversalMetrics.Price,
  yAxisMetric: UniversalMetrics.SurfaceArea,
};

const globalReducer = createReducer(
  initialState,
  on(fromActions.updateCountry, (state, { country }) => ({ ...state, selectedCountry: country })),
  on(fromActions.updateChartType, (state, { chartType }) => ({ ...state, chartType })),

  on(fromActions.updateXAxisMetric, (state, { xAxisMetric }) => ({ ...state, xAxisMetric })),
  on(fromActions.updateYAxisMetric, (state, { yAxisMetric }) => ({ ...state, yAxisMetric })),

  on(fromActions.populateCityList, (state, { cityList }) => ({ ...state, allCities: cityList })),

  // on(fromActions.addCity, (state, { city, color }) => ({ ...state, activeCities: [...state.activeCities, { city, color }] })),
  on(fromActions.removeCity, (state, { city }) => ({ ...state, activeCities: state.activeCities.filter(activeCity => activeCity.city !== city), lastRemovedCity: city })),

  on(fromActions.addUnifiedDataToStore, (state, { unifiedBuyData, unifiedRentData }) => ({ ...state, unifiedBuyData, unifiedRentData })),

  on(fromActions.addBuyChartDataset, (state, { dataset }) => ({ ...state, buyChartDatasets: [...state.buyChartDatasets, dataset] })),
  on(fromActions.addRentChartDataset, (state, { dataset }) => ({ ...state, rentChartDatasets: [...state.rentChartDatasets, dataset] })),

  on(fromActions.addBuyChartDatasets, (state, { datasets }) => ({ ...state, buyChartDatasets: datasets })),
  on(fromActions.addRentChartDatasets, (state, { datasets }) => ({ ...state, rentChartDatasets: datasets })),
  on(fromActions.addChartDatasetsToStore, (state, { activeCity, buyChart, rentChart }) => ({ ...state, buyChartDatasets: buyChart, rentChartDatasets: rentChart, lastAddedCity: activeCity, activeCities: [...state.activeCities, activeCity] })),

  on(fromActions.removeBuyChartDataset, (state, { dataset }) => ({ ...state, buyChartDatasets: [dataset, ...state.buyChartDatasets] })),
  on(fromActions.removeRentChartDataset, (state, { dataset }) => ({ ...state, rentChartDatasets: [dataset, ...state.rentChartDatasets] })),
);

export function reducer(state: GlobalState | undefined, action: Action) {
  return globalReducer(state, action);
}
