import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ChartService } from '../../services';
import { AppState } from '../models';
import * as fromGlobalActions from '../actions/global.actions';


@Injectable()
export class ChartEffects {

  // updateXAxisMetric$ = createEffect(() => this.actions$.pipe(
  //   ofType(fromGlobalActions.updateXAxisMetric),
  //   map((action) => {

  //     const unifiedData = this.globalService.unifyData(action.country, action.data);
  //     return fromGlobalActions.addUnifiedDataToStore({ unifiedData });
  //   })
  // ));

  constructor(
    private actions$: Actions,
    private chartService: ChartService,
    private store: Store<AppState>,
  ) {}
}
