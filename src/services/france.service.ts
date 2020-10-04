import { Injectable } from '@angular/core';
import {
  Country,
  FranceUniversalListingJsonFormat,
  PaymentType,
  UniversalListingProperties,
} from '../../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const DATA_PATH = '../assets/data';

@Injectable({
  providedIn: 'root'
})
export class FranceService {

  constructor(private http: HttpClient) { }

  getFranceData(paymentType: PaymentType): Observable<FranceUniversalListingJsonFormat[]> {
    const url = `${DATA_PATH}/output/${Country.France}-${paymentType}-output.json`;
    return this.http.get<FranceUniversalListingJsonFormat[]>(url);
  }

  unifyFranceData(listings: FranceUniversalListingJsonFormat[]): UniversalListingProperties[] {
    return listings.map((listing: FranceUniversalListingJsonFormat) => ({
      price: Number(listing.prix),
      city: listing.ville,
      surfaceArea: Number(listing.surface),
      numberOfRooms: Number(listing.nbpieces),
      numberOfBedrooms: Number(listing.nbchambres),
      longitude: Number(listing.longitude),
      latitude: Number(listing.latitude),
      link: listing.urlann,
      postalCode: Number(listing.postalCode),
    }));
  }
}
