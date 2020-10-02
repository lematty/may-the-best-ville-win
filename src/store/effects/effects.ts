import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { FranceService, UsService } from '../../services';
import * as fromFranceActions from '../actions/france.actions';
import * as fromGlobalActions from '../actions/actions';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Country, FranceBuyListingJsonFormat, UniversalBuyListingProperties } from '../../../models';
import { AppState, selectFranceBuyJsonData, selectUsBuyJsonData } from '../selectors/selectors';

@Injectable()
export class FranceEffects {

  addFranceBuyData$ = createEffect(() => this.actions$.pipe(
    ofType(fromFranceActions.fetchFranceBuyData),
    mergeMap(() => this.franceService.fetchFranceBuyData()
      .pipe(
        map((data: FranceBuyListingJsonFormat[]) => fromFranceActions.addFranceBuyData({ data })),
        catchError(() => EMPTY),
      )
    )
  ));

  addFranceRentData$ = createEffect(() => this.actions$.pipe(
    ofType(fromFranceActions.fetchFranceRentData),
    mergeMap(() => this.franceService.fetchFranceRentData()
      .pipe(
        map((data: UniversalBuyListingProperties[]) => fromFranceActions.addFranceRentData({ data })),
        catchError(() => EMPTY),
      )
    )
  ));

  updateCountry$ = createEffect(() => this.actions$.pipe(
    ofType(fromGlobalActions.updateCountry),
    withLatestFrom(
      this.store.select(selectFranceBuyJsonData),
      this.store.select(selectUsBuyJsonData),
    ),
    map(([action, franceData, usData]) => {
      let unifiedData: UniversalBuyListingProperties[];
      if (action.country === Country.France) {
        unifiedData = this.franceService.unifyFranceData(franceData);
      } else {
        unifiedData = this.usService.unifyUsData(usData);
      }
      return fromGlobalActions.addUnifiedDataToStore({ unifiedData });
    })
  ));

  constructor(
    private actions$: Actions,
    private franceService: FranceService,
    private usService: UsService,
    private store: Store<AppState>,
  ) {}
}
