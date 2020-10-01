import { FranceBuyListingJsonFormat, UniversalBuyListingProperties } from '../../../models';

export interface FranceState {
  franceBuyJsonData: FranceBuyListingJsonFormat[];
  franceRentJsonData: UniversalBuyListingProperties[];
}
