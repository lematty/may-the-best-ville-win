export interface FormattedUsBuyListing {
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

export enum UsCityList {
  Denver = 'Denver',
  JerseyCity = 'Jersey City',
  LasVegas = 'Las Vegas',
  Portland = 'Portland',
  SaltLakeCity = 'Salt Lake City',
}
