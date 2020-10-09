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

export const updateCountry = createAction('[Global] Update selected country', props<{ country: Country }>());
export const updateChartType = createAction('[Global] Update graph type', props<{ chartType: ChartType }>());
export const updatePaymentType = createAction('[Global] Update payment type', props<{ paymentType: PaymentType }>());

export const updateXAxisMetric = createAction('[Global] Update X axis metric', props<{ xAxisMetric: UniversalMetrics }>());
export const updateYAxisMetric = createAction('[Global] Update Y axis metric', props<{ yAxisMetric: UniversalMetrics }>());

export const addCity = createAction('[Global] Add city', props<{ city: AllCitiesList }>());
export const removeCity = createAction('[Global] Remove city', props<{ city: AllCitiesList }>());

export const addFranceDataToUnifiedData = createAction('[France] Add France buy data to unified data', props<{ unifiedData: UniversalListingJsonFormat[] }>());
export const addUsDataToUnifiedData = createAction('[US] Add US buy data to unified data');
export const addUnifiedDataToStore = createAction('[Global] Add unified data to store', props<{ unifiedBuyData: UniversalListingProperties[], unifiedRentData: UniversalListingProperties[] }>());
export const unifyData = createAction('[Global] Unify data', props<{
  country: Country,
  paymentType: PaymentType,
  buyData: FranceUniversalListingJsonFormat[]
  rentData: FranceUniversalListingJsonFormat[]
}>());

export const addChartDatasets = createAction('[Global] Add rent chart dataset', props<{ buyChart: ChartDataSets[], rentChart: ChartDataSets[] }>());
export const addBuyChartDataset = createAction('[Global] Add buy chart dataset', props<{ dataset: ChartDataSets }>());
export const addRentChartDataset = createAction('[Global] Add rent chart dataset', props<{ dataset: ChartDataSets }>());

export const addBuyChartDatasets = createAction('[Global] Add buy chart datasets', props<{ datasets: ChartDataSets[] }>());
export const addRentChartDatasets = createAction('[Global] Add rent chart datasets', props<{ datasets: ChartDataSets[] }>());

export const removeBuyChartDataset = createAction('[Global] Remove buy chart dataset', props<{ dataset: ChartDataSets }>());
export const removeRentChartDataset = createAction('[Global] Remove rent chart dataset', props<{ dataset: ChartDataSets }>());

export const updateChartDatasets = createAction('[Global] update chart datasets', props<{ buyData: UniversalListingProperties[], rentData: UniversalListingProperties[] }>());
export const updateBuyChartDatasets = createAction('[Global] update buy chart datasets', props<{ datasets: UniversalListingProperties[] }>());
export const updateRentChartDatasets = createAction('[Global] update rent chart datasets', props<{ datasets: UniversalListingProperties[] }>());
