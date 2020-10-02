import { Injectable } from '@angular/core';
import { Country, FranceBuyListingJsonFormat, PaymentType, UniversalBuyListingProperties } from '../../models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const DATA_PATH = '../assets/data';

@Injectable({
  providedIn: 'root'
})
export class FranceService {

  constructor(private http: HttpClient) { }

  fetchFranceBuyData(): Observable<FranceBuyListingJsonFormat[]> {
    const url = `${DATA_PATH}/output/${Country.France}-${PaymentType.Buy}-output.json`;
    return this.http.get<FranceBuyListingJsonFormat[]>(url);
  }

  fetchFranceRentData(): Observable<any> {
    return ;
  }

  unifyFranceData(listings: FranceBuyListingJsonFormat[]): UniversalBuyListingProperties[] {
    return listings.map((listing: FranceBuyListingJsonFormat) => ({
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
