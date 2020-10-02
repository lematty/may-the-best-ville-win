import { FranceBuyListingJsonFormat, FranceCityList } from './france.model';
import { UsBuyListingJsonFormat, UsCityList } from './us.model';

export enum DataDirection {
  Pull = 'pull',
  Push = 'push',
}

export enum Country {
  France = 'france',
  Us = 'us',
}

export enum PaymentType {
  Buy = 'buy',
  Rent = 'rent',
}

export interface UniversalBuyListingProperties {
  price: number;
  city: string;
  surfaceArea: number;
  numberOfRooms: number;
  numberOfBedrooms: number;
  longitude: number;
  latitude: number;
  link: string;
  postalCode: number;
}

export enum UniversalMetrics {
  Price = 'price',
  City = 'city',
  SurfaceArea = 'surfaceArea',
  NumberOfRooms = 'numberOfRooms',
  NumberOfBedrooms = 'numberOfBedrooms',
  Longitude = 'longitude',
  Latitude = 'latitude',
  Link = 'link',
  PostalCode = 'postalCode'
}

export type GraphType = 'bar' | 'scatter' | 'pie';
export type FranceMetrics = keyof FranceBuyListingJsonFormat;
export type UsMetrics = keyof UsBuyListingJsonFormat;

export type AllCitiesList = Array<FranceCityList | UsCityList>;
