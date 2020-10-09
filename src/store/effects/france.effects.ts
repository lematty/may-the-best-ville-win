import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { FranceService, UsService } from '../../services';
import * as fromFranceActions from '../actions/france.actions';
import * as fromGlobalActions from '../actions/global.actions';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Country, FranceBuyListingJsonFormat, UniversalListingProperties } from '../../../models';
import { selectFranceBuyJsonData, selectUsBuyJsonData } from '../selectors';
import { AppState } from '../models';
import { selectCountry } from '../selectors/global.selectors';

@Injectable()
export class FranceEffects {

  // addFranceBuyDataToStore$ = createEffect(() => this.actions$.pipe(
  //   ofType(fromFranceActions.fetchFranceBuyData),
  //   mergeMap(() => this.franceService.fetchFranceBuyData()
  //     .pipe(
  //       map((data: FranceBuyListingJsonFormat[]) => fromFranceActions.addFranceBuyData({ data })),
  //       catchError(() => EMPTY),
  //     )
  //   )
  // ));

  // addFranceRentDataToStore$ = createEffect(() => this.actions$.pipe(
  //   ofType(fromFranceActions.fetchFranceRentData),
  //   mergeMap(() => this.franceService.fetchFranceRentData()
  //     .pipe(
  //       map((data: UniversalListingProperties[]) => fromFranceActions.addFranceRentData({ data })),
  //       catchError(() => EMPTY),
  //     )
  //   )
  // ));

  constructor(
    private actions$: Actions,
    private franceService: FranceService,
    private usService: UsService,
    private store: Store<AppState>,
  ) {}
}
