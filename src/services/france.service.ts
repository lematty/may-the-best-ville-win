import { Injectable } from '@angular/core';
import { Country, FranceBuyListingJsonFormat, PaymentType, UniversalBuyListingProperties } from '../../models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const ASSETS_PATH = '../assets';

@Injectable({
  providedIn: 'root'
})
export class FranceService {

  constructor(private http: HttpClient) { }

  fetchFranceBuyData(): Observable<UniversalBuyListingProperties[]> {
    const url = `${ASSETS_PATH}/${Country.France}-${PaymentType.Buy}-output.json`;
    console.log('url: ', url);
    return this.http.get<FranceBuyListingJsonFormat[]>(url).pipe(
      map((listings: FranceBuyListingJsonFormat[]) => this.unifyFranceData(listings))
    );
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
