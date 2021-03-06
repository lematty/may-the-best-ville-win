import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromGlobalActions from '../actions/global.actions';
import * as fromFranceActions from '../actions/france.actions';
import * as fromUsActions from '../actions/us.actions';
import { mergeMap, withLatestFrom, switchMap, map } from 'rxjs/operators';
import { selectCountry } from '../selectors';
import { AppState } from '../models';
import { CalculationsService, GlobalService } from '../../services';
import { selectUniformData } from '../selectors/global.selectors';
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
      const buyData = data.buyData.filter(listing => listing.city === action.city);
      const rentData = data.rentData.filter(listing => listing.city === action.city);

      const averageBuyData = this.calculationService.getAverages(buyData);
      const averageRentData = this.calculationService.getAverages(rentData);

      const { monthlyBuyEstimation, monthlyRentEstimation } = this.calculationService.getMonthlyStudioEstimations(
        averageBuyData.averagePriceBySurfaceArea,
        averageRentData.averagePriceBySurfaceArea
      );

      const totalBuyPrice = averageBuyData.averagePriceBySurfaceArea * 25;
      const monthlyDifference = monthlyRentEstimation - monthlyBuyEstimation;
      const minimumPrice = this.calculationService.dropPriceToBePositive(averageBuyData.averagePriceBySurfaceArea, monthlyRentEstimation);

      const minValues = this.calculationService.getPostivityLine(minimumPrice);
      const activeCity = {
        city: action.city,
        color: action.color,
        averageBuyPrice: averageBuyData.averagePrice,
        averageBuySurfaceArea: averageBuyData.averageSurfaceArea,
        averageBuyPriceBySurfaceArea: averageBuyData.averagePriceBySurfaceArea,
        averageRentPrice: averageRentData.averagePrice,
        averageRentSurfaceArea: averageRentData.averageSurfaceArea,
        averageRentPriceBySurfaceArea: averageRentData.averagePriceBySurfaceArea,
        totalBuyPrice,
        minimumPrice,
        monthlyBuyEstimation,
        monthlyRentEstimation,
        monthlyDifference,
        minValues,
      };
      return [
        // fromGlobalActions.addCityToStore(activeCity),
        fromGlobalActions.formatCityDataset({ activeCity, buyData, rentData })
      ];
    })
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
