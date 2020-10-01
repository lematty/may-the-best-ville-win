import { createAction, props } from '@ngrx/store';
import { UniversalBuyListingProperties } from '../../../models';

export const addFranceBuyData = createAction('[France] Add France buy data to store', props<{ data: UniversalBuyListingProperties[] }>());
export const addFranceRentData = createAction('[France] Add France rent data to store', props<{ data: UniversalBuyListingProperties[] }>());

export const fetchFranceBuyData = createAction('[France] Fetch France buy data from json');
export const fetchFranceRentData = createAction('[France] Fetch France rent data from json');
export const addFranceDataToUnifiedData = createAction('[France] Fetch France buy data to unified data');
