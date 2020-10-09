import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country, DataDirection, PaymentType, UniversalListingJsonFormat } from '../../models';
import { Observable, forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private DATA_PATH = '../assets/data';

  constructor(private http: HttpClient) {}

  getDataUrl(country: Country, paymentType: PaymentType) {
    return `${this.DATA_PATH}/output/${country}-${paymentType}${this.getFileEnding(DataDirection.Pull)}`;
  }

  getFileEnding(dataDirection: DataDirection) {
    return dataDirection === DataDirection.Pull ? '-output.json' : '.json';
  }

  getData(country: Country): Observable<[UniversalListingJsonFormat[], UniversalListingJsonFormat[]]> {
    const buyUrl = this.getDataUrl(country, PaymentType.Buy);
    const rentUrl = this.getDataUrl(country, PaymentType.Rent);
    const buyData = this.http.get<UniversalListingJsonFormat[]>(buyUrl);
    const rentData = this.http.get<UniversalListingJsonFormat[]>(rentUrl);
    return forkJoin([buyData, rentData]);
  }
}
