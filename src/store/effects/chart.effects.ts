import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ChartService } from '../../services';
import { AppState } from '../models';
import * as fromGlobalActions from '../actions/global.actions';
import { map, withLatestFrom } from 'rxjs/operators';
import { selectChartType, selectUniformData, selectXAxisMetric, selectYAxisMetric } from '../selectors/global.selectors';


@Injectable()
export class ChartEffects {

  updateAxisMetric$ = createEffect(() => this.actions$.pipe(
    ofType(
      fromGlobalActions.updateXAxisMetric,
      fromGlobalActions.updateYAxisMetric,
    ),
    withLatestFrom(this.store.select(selectUniformData)),
    map(([, data]) => fromGlobalActions.updateChartDatasets({ datasets: data }))
  ));

  updateChartDatasets$ = createEffect(() => this.actions$.pipe(
    ofType(fromGlobalActions.updateChartDatasets),
    withLatestFrom(
      this.store.select(selectChartType),
      this.store.select(selectXAxisMetric),
      this.store.select(selectYAxisMetric),
    ),
    map(([action, chartType, xAxis, yAxis]) => {
      const { datasets, options } = this.chartService.createChartData(chartType, action.datasets, xAxis, yAxis);
      return fromGlobalActions.addChartDatasets({ datasets });
    })
  ));

  constructor(
    private actions$: Actions,
    private chartService: ChartService,
    private store: Store<AppState>,
  ) {}
}
