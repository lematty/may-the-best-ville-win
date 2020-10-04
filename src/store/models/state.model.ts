import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import {
  AllCitiesList,
  Country,
  FranceBuyListingJsonFormat,
  FranceRentListingJsonFormat,
  PaymentType,
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
  selectedMetric: UniversalMetrics;
  chartType: ChartType;
  paymentType: PaymentType;
  selectedCities: AllCitiesList[];
  uniformData: UniversalListingProperties[];
  chartDatasets: ChartDataSets[];
  chartOptions: ChartOptions;
}

export interface FranceState {
  franceBuyJsonData: FranceBuyListingJsonFormat[];
  franceRentJsonData: FranceRentListingJsonFormat[];
}

export interface UsState {
  usBuyJsonData: UsBuyListingJsonFormat[];
  usRentJsonData: UsRentListingJsonFormat[];
}