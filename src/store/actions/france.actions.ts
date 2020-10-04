import { createAction, props } from '@ngrx/store';
import { FranceBuyListingJsonFormat, FranceRentListingJsonFormat } from '../../../models';

export const addFranceBuyData = createAction('[France] Add France buy data to store', props<{ data: FranceBuyListingJsonFormat[] }>());
export const addFranceRentData = createAction('[France] Add France rent data to store', props<{ data: FranceRentListingJsonFormat[] }>());

export const fetchFranceBuyData = createAction('[France] Fetch France buy data from json');
export const fetchFranceRentData = createAction('[France] Fetch France rent data from json');
