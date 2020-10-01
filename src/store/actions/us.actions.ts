import { createAction, props } from '@ngrx/store';
import { UniversalBuyListingProperties } from '../../../models';

export const addUSBuyData = createAction('[US] Add US buy data to store', props<{ data: UniversalBuyListingProperties[] }>());
export const addUSRentData = createAction('[US] Add US rent data to store', props<{ data: UniversalBuyListingProperties[] }>());

export const fetchUSBuyData = createAction('[US] Fetch US buy data from json');
export const fetchUSRentData = createAction('[US] Fetch US rent data from json');
