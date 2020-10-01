import { createAction, props } from '@ngrx/store';
import { AllCitiesList, UniversalMetrics, Country, GraphType, UniversalBuyListingProperties } from '../../../models';

export const updateSelectedMetric = createAction('[Global] Update selected metric', props<{ selectedMetric: UniversalMetrics }>());
export const updateCountry = createAction('[Global] Update selected country', props<{ country: Country }>());
export const updateGraphType = createAction('[Global] Update graph type', props<{ graphType: GraphType }>());

export const addCity = createAction('[Global] Add city', props<{ city: AllCitiesList }>());
export const removeCity = createAction('[Global] Remove city', props<{ city: AllCitiesList }>());
