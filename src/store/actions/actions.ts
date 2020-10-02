import { createAction, props } from '@ngrx/store';
import { AllCitiesList, UniversalMetrics, Country, GraphType, UniversalBuyListingProperties } from '../../../models';
import { FranceBuyListingJsonFormat } from '../../../models/france.model';

export const updateSelectedMetric = createAction('[Global] Update selected metric', props<{ selectedMetric: UniversalMetrics }>());
export const updateCountry = createAction('[Global] Update selected country', props<{ country: Country }>());
export const updateGraphType = createAction('[Global] Update graph type', props<{ graphType: GraphType }>());

export const addCity = createAction('[Global] Add city', props<{ city: AllCitiesList }>());
export const removeCity = createAction('[Global] Remove city', props<{ city: AllCitiesList }>());

export const addFranceDataToUnifiedData = createAction('[France] Add France buy data to unified data', props<{ unifiedData: FranceBuyListingJsonFormat[] }>());
export const addUsDataToUnifiedData = createAction('[US] Add US buy data to unified data');
export const addUnifiedDataToStore = createAction('[Global] Add unified data to store', props<{ unifiedData: UniversalBuyListingProperties[] }>());
