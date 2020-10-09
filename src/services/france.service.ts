import { Injectable } from '@angular/core';
import {
  Country,
  FranceUniversalListingJsonFormat,
  UniversalListingProperties,
} from '../../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FranceService {

  constructor(private http: HttpClient, private dataService: DataService) { }

  getFranceData(): Observable<[FranceUniversalListingJsonFormat[], FranceUniversalListingJsonFormat[]]> {
    return this.dataService.getData(Country.France);
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
