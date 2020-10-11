import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromGlobalActions from '../actions/global.actions';
import * as fromFranceActions from '../actions/france.actions';
import * as fromUsActions from '../actions/us.actions';
import { mergeMap, withLatestFrom, switchMap, map, tap } from 'rxjs/operators';
import { selectCountry } from '../selectors';
import { AppState } from '../models';
import { CalculationsService, GlobalService } from '../../services';
import { selectUniformData } from '../selectors/global.selectors';
import { testAction } from '../actions/global.actions';
import {
  Country,
  FranceBuyListingJsonFormat,
  FranceRentListingJsonFormat,
  PaymentType,
  UniversalListingJsonFormat,
  UsBuyListingJsonFormat,
  UsRentListingJsonFormat
} from '../../../models';

@Injectable()
export class GlobalEffects {
  unifyData$ = createEffect(() => this.actions$.pipe(
    ofType(fromGlobalActions.unifyData),
    switchMap((action) => {
      const unifiedBuyData = this.globalService.unifyData(action.country, action.buyData);
      const unifiedRentData = this.globalService.unifyData(action.country, action.rentData);
      const cityList = this.globalService.getCitiesList(unifiedBuyData, unifiedRentData);
      return [
        // fromGlobalActions.updateChartDatasets({ buyData: unifiedBuyData, rentData: unifiedRentData }),
        fromGlobalActions.addUnifiedDataToStore({ unifiedBuyData, unifiedRentData }),
        fromGlobalActions.populateCityList({ cityList }),
      ];
    })
  ));

  intialSetup$ = createEffect(() => this.actions$.pipe(
    ofType(fromGlobalActions.initialSetup),
    withLatestFrom(this.store.select(selectCountry)),
    mergeMap(([, country]) => {
      return this.globalService.fetchRawDataFromJson(country).pipe(
        switchMap(([buyData, rentData]) => {
          const addRawDataToStoreActions = this.chooseActions(country, buyData, rentData);
          return [
            fromGlobalActions.unifyData({ country, paymentType: PaymentType.Buy, buyData, rentData }),
            addRawDataToStoreActions.buyAction,
            addRawDataToStoreActions.rentAction,
          ];
        })
      );
    })
  ));

  addCity$ = createEffect(() => this.actions$.pipe(
    ofType(fromGlobalActions.addCity),
    withLatestFrom(this.store.select(selectUniformData)),
    switchMap(([action, data]) => {
      console.log('addCity$ effect', action, data);
      const buyData = data.buyData.filter(listing => listing.city === action.city);
      const buyPrices = buyData.map(listing => listing.price);
      const averageBuyPrice = this.calculationService.getAverage(buyPrices);
      const rentData = data.rentData.filter(listing => listing.city === action.city);
      const rentPrices = rentData.map(listing => listing.price);
      const averageRentPrice = this.calculationService.getAverage(rentPrices);
      const activeCity = { city: action.city, color: action.color, averageBuyPrice, averageRentPrice };
      return [
        fromGlobalActions.addCityToStore(activeCity),
        fromGlobalActions.formatCityDataset({ activeCity, buyData, rentData })
      ];
    })
  ));

  testAction$ = createEffect(() => this.actions$.pipe(
    ofType(fromGlobalActions.testAction),
    tap((action) => console.log('testAction', action.text))
  ));

  chooseActions(country: Country, buyData: UniversalListingJsonFormat[], rentData: UniversalListingJsonFormat[]) {
    if (country === Country.France) {
      return {
        buyAction: fromFranceActions.addFranceBuyData({ data: buyData as FranceBuyListingJsonFormat[] }),
        rentAction: fromFranceActions.addFranceRentData({ data: rentData as FranceRentListingJsonFormat[] }),
      };
    }
    if (country === Country.Us) {
      return {
        buyAction: fromUsActions.addUsBuyData({ data: buyData as UsBuyListingJsonFormat[] }),
        rentAction: fromUsActions.addUsRentData({ data: rentData as UsRentListingJsonFormat[] }),
      };
    }
  }

  constructor(
    private actions$: Actions,
    private calculationService: CalculationsService,
    private globalService: GlobalService,
    private store: Store<AppState>,
  ) {}
}
