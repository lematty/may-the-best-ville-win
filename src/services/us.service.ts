import { Injectable } from '@angular/core';
import { UsBuyListingJsonFormat, UniversalBuyListingProperties } from '../../models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const ASSETS_PATH = '../assets';

@Injectable({
  providedIn: 'root'
})
export class UsService {

  constructor(private http: HttpClient) { }

  unifyUsData(listings: UsBuyListingJsonFormat[]): UniversalBuyListingProperties[]  {
    return;
  }
}
