import { createAction, props } from '@ngrx/store';
import { ChartDataSets, ChartType } from 'chart.js';
import {
  AllCitiesList,
  Country,
  FranceUniversalListingJsonFormat,
  PaymentType,
  UniversalListingJsonFormat,
  UniversalListingProperties,
  UniversalMetrics,
} from '../../../models';

export const initialSetup = createAction('[Global] Initial setup');

export const updateSelectedMetric = createAction('[Global] Update selected metric', props<{ selectedMetric: UniversalMetrics }>());
export const updateCountry = createAction('[Global] Update selected country', props<{ country: Country }>());
export const updateChartType = createAction('[Global] Update graph type', props<{ chartType: ChartType }>());
export const updatePaymentType = createAction('[Global] Update payment type', props<{ paymentType: PaymentType }>());

export const addCity = createAction('[Global] Add city', props<{ city: AllCitiesList }>());
export const removeCity = createAction('[Global] Remove city', props<{ city: AllCitiesList }>());

export const addFranceDataToUnifiedData = createAction('[France] Add France buy data to unified data', props<{ unifiedData: UniversalListingJsonFormat[] }>());
export const addUsDataToUnifiedData = createAction('[US] Add US buy data to unified data');
export const addUnifiedDataToStore = createAction('[Global] Add unified data to store', props<{ unifiedData: UniversalListingProperties[] }>());
export const unifyData = createAction('[Global] Unify data', props<{
  country: Country,
  paymentType: PaymentType,
  data: Array<FranceUniversalListingJsonFormat>
}>());

export const addChartDataset = createAction('[Global] Add chart dataset', props<{ dataset: ChartDataSets }>());
export const removeChartDataset = createAction('[Global] Remove chart dataset', props<{ dataset: ChartDataSets }>());
