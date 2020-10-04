import { createAction, props } from '@ngrx/store';
import { UsBuyListingJsonFormat, UsRentListingJsonFormat } from '../../../models';

export const addUsBuyData = createAction('[US] Add US buy data to store', props<{ data: UsBuyListingJsonFormat[] }>());
export const addUsRentData = createAction('[US] Add US rent data to store', props<{ data: UsRentListingJsonFormat[] }>());

export const fetchUsBuyData = createAction('[US] Fetch US buy data from json');
export const fetchUsRentData = createAction('[US] Fetch US rent data from json');
