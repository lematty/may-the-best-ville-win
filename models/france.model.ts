export interface FranceUniversalListingRawFormat {
  result: {
    idannonce: number;
    bu: Bu;
    ville: string;
    nbpieces: number;
    surface: number;
    nbchambres: number;
    idpublication: number;
    descriptif: string;
    nbphotos: number;
    estViager: boolean;
    longitude: number;
    latitude: number;
    precision: number;
    imgs: string[];
    titre: string;
    prix: string;
    urlann: string;
    department: string;
    district: string;
    postalCode: string;
    monthlyPayment: string;
    geometry: Geometry;
  };
}
export interface FranceBuyListingJsonFormat {
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

export type FranceRentListingJsonFormat = Omit<FranceBuyListingJsonFormat, 'monthlyPayment'>;

export type FranceUniversalListingJsonFormat = FranceBuyListingJsonFormat | FranceRentListingJsonFormat;

interface Bu {
  label: string;
  id: string;
}

interface Geometry {
  type: 'Feature' | 'Polygon';
  geometry?: Geometry;
  coordinates?: Array<Array<[number, number]>>;
}

export enum FranceCityList {
  Bordeaux = 'Bordeaux',
  Grenoble = 'Grenoble',
  Nantes = 'Nantes',
  Rennes = 'Rennes',
  Paris = 'Paris',
  Toulouse = 'Toulouse',
  Vincennes = 'Vincennes',
}
