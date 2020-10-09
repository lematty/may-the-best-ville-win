import { Injectable } from '@angular/core';
import {
  Country,
  FranceUniversalListingJsonFormat,
  UniversalListingJsonFormat,
  UniversalListingProperties,
} from '../../models';
import { Observable } from 'rxjs';
import { FranceService } from './france.service';
import { UsService } from './us.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private franceService: FranceService,
    private usService: UsService,
  ) { }

  fetchRawDataFromJson(country: Country): Observable<[UniversalListingJsonFormat[], UniversalListingJsonFormat[]]> {
    return country === Country.France
      ? this.franceService.getFranceData()
      : this.usService.getUsData();
  }

  unifyData(country: Country, data: FranceUniversalListingJsonFormat[]): UniversalListingProperties[] {
    return country === Country.France
      ? this.franceService.unifyFranceData(data)
      : this.usService.unifyUsData(data);
  }
}
