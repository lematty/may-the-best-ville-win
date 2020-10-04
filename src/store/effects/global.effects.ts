import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import * as fromGlobalActions from '../actions/global.actions';
import * as fromFranceActions from '../actions/france.actions';
import * as fromUsActions from '../actions/us.actions';
import { mergeMap, map, catchError, withLatestFrom, concatMap, switchMap } from 'rxjs/operators';
import { selectCountry, selectPaymentType } from '../selectors';
import { AppState } from '../models';
import { GlobalService } from '../../services';
import { Country, FranceBuyListingJsonFormat, FranceRentListingJsonFormat, PaymentType, UniversalListingJsonFormat, UsBuyListingJsonFormat, UsRentListingJsonFormat } from '../../../models';

@Injectable()
export class GlobalEffects {
  unifyData$ = createEffect(() => this.actions$.pipe(
    ofType(fromGlobalActions.unifyData),
    map((action) => {
      const unifiedData = this.globalService.unifyData(action.country, action.data);
      return fromGlobalActions.addUnifiedDataToStore({ unifiedData });
    })
  ));

  fetchRawDataFromJson$ = createEffect(() => this.actions$.pipe(
    ofType(
      fromGlobalActions.initialSetup,
      fromGlobalActions.updateCountry,
      fromGlobalActions.updatePaymentType,
    ),
    withLatestFrom(
      this.store.select(selectCountry),
      this.store.select(selectPaymentType),
    ),
    mergeMap(([, country, paymentType]) => {
      console.log('fetchRawDataFromJson$', country, paymentType);
      return this.globalService.fetchRawDataFromJson(country, paymentType).pipe(
        switchMap((rawData) => {
          const addRawDataToStoreAction = this.chooseAction(country, paymentType, rawData);
          return [
            fromGlobalActions.unifyData({ country, paymentType, data: rawData }),
            addRawDataToStoreAction
          ];
        })
      );
    })
  ));

  chooseAction(country: Country, paymentType: PaymentType, data: UniversalListingJsonFormat[]) {
    if (country === Country.France && paymentType === PaymentType.Buy) {
      return fromFranceActions.addFranceBuyData({ data: data as FranceBuyListingJsonFormat[] });
    }
    if (country === Country.France && paymentType === PaymentType.Rent) {
      return fromFranceActions.addFranceRentData({ data: data as FranceRentListingJsonFormat[] });
    }
    if (country === Country.Us && paymentType === PaymentType.Buy) {
      return fromUsActions.addUsBuyData({ data: data as UsBuyListingJsonFormat[] });
    }
    if (country === Country.Us && paymentType === PaymentType.Rent) {
      return fromUsActions.addUsRentData({ data: data as UsRentListingJsonFormat[] });
    }
  }

  constructor(
    private actions$: Actions,
    private globalService: GlobalService,
    private store: Store<AppState>,
  ) {}
}
