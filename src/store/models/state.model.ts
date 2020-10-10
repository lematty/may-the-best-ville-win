import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import {
  ActiveCity,
  Country,
  FranceBuyListingJsonFormat,
  FranceRentListingJsonFormat,
  UniversalListingProperties,
  UniversalMetrics,
  UsBuyListingJsonFormat,
  UsRentListingJsonFormat,
} from '../../../models';

export interface AppState {
  globalState: GlobalState;
  franceState: FranceState;
  usState: UsState;
}

export interface GlobalState {
  selectedCountry: Country;
  chartType: ChartType;
  allCities: string[];
  activeCities: ActiveCity[];
  lastUpdatedCity: ActiveCity;
  unifiedBuyData: UniversalListingProperties[];
  unifiedRentData: UniversalListingProperties[];
  buyChartDatasets: ChartDataSets[];
  rentChartDatasets: ChartDataSets[];
  chartOptions: ChartOptions;
  xAxisMetric: UniversalMetrics;
  yAxisMetric: UniversalMetrics;
}

export interface FranceState {
  franceBuyJsonData: FranceBuyListingJsonFormat[];
  franceRentJsonData: FranceRentListingJsonFormat[];
}

export interface UsState {
  usBuyJsonData: UsBuyListingJsonFormat[];
  usRentJsonData: UsRentListingJsonFormat[];
}
