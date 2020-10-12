import { FranceBuyListingJsonFormat, FranceCityList, FranceUniversalListingJsonFormat } from './france.model';
import { UsBuyListingJsonFormat, UsCityList, UsUniversalListingJsonFormat } from './us.model';

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

export interface UniversalListingProperties {
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

export type UniversalListingJsonFormat = UsUniversalListingJsonFormat | FranceUniversalListingJsonFormat;

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

export interface ActiveCity {
  city: string;
  color: string;
  averageBuyPrice: number;
  averageBuySurfaceArea: number;
  averageBuyPriceBySurfaceArea: number;
  averageRentPrice: number;
  averageRentSurfaceArea: number;
  averageRentPriceBySurfaceArea: number;
  monthsToPayLoan: number;
}

export type FranceMetrics = keyof FranceBuyListingJsonFormat;
export type UsMetrics = keyof UsBuyListingJsonFormat;
// export type City = string;
// export type City = FranceCityList | UsCityList;
// export type City = Array<FranceCityList | UsCityList>;
