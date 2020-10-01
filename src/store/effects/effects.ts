import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { FranceService } from '../../services';
import * as fromFranceActions from '../actions/france.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { UniversalBuyListingProperties } from '../../../models';

@Injectable()
export class FranceEffects {

  addFranceBuyData$ = createEffect(() => this.actions$.pipe(
    ofType(fromFranceActions.fetchFranceBuyData),
    mergeMap(() => this.franceService.fetchFranceBuyData()
      .pipe(
        map((data: UniversalBuyListingProperties[]) => fromFranceActions.addFranceBuyData({ data })),
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

  constructor(
    private actions$: Actions,
    private franceService: FranceService,
  ) {}
}
