import { Injectable } from '@angular/core';
import {
  UniversalListingProperties,
  PaymentType,
  UsBuyListingJsonFormat,
  UsRentListingJsonFormat,
  UsUniversalListingJsonFormat
} from '../../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const ASSETS_PATH = '../assets';

@Injectable({
  providedIn: 'root'
})
export class UsService {

  constructor(private http: HttpClient) { }

  fetchUsBuyData(url: string): Observable<UsBuyListingJsonFormat[]> {
    return this.http.get<UsBuyListingJsonFormat[]>(url);
  }

  fetchUsRentData(url: string): Observable<UsRentListingJsonFormat[]> {
    return this.http.get<UsRentListingJsonFormat[]>(url);
  }

  unifyUsData(listings: UsUniversalListingJsonFormat[]): UniversalListingProperties[]  {
    return;
  }

  getUsData(paymentType: PaymentType): Observable<UsUniversalListingJsonFormat[]> {
    return;
  }
}
