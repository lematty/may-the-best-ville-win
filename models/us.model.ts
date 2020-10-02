export interface UsBuyListingRawFormat {
  // TODO: poplate list
}

export interface UsBuyListingJsonFormat {
  idannonce: number;
  bu: string;
  ville: string;
  nbpieces: number;
  surface: number;
  nbchambres: number;
  longitude: number;
  latitude: number;
  titre: string;
  prix: number;
  urlann: string;
  department: string;
  district: string;
  postalCode: number;
  monthlyPayment: number;
  geometry: string;
}

export enum UsCityList {
  Denver = 'Denver',
  JerseyCity = 'Jersey City',
  LasVegas = 'Las Vegas',
  Portland = 'Portland',
  SaltLakeCity = 'Salt Lake City',
}
