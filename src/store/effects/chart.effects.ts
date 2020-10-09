import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ChartService } from '../../services';
import { AppState } from '../models';
import * as fromGlobalActions from '../actions/global.actions';
import { map, withLatestFrom } from 'rxjs/operators';
import { selectChartType, selectXAxisMetric, selectYAxisMetric, selectUniformBuyData, selectUniformRentData } from '../selectors/global.selectors';

@Injectable()
export class ChartEffects {

  updateAxisMetric$ = createEffect(() => this.actions$.pipe(
    ofType(
      fromGlobalActions.updateXAxisMetric,
      fromGlobalActions.updateYAxisMetric,
    ),
    withLatestFrom(
      this.store.select(selectUniformBuyData),
      this.store.select(selectUniformRentData),
    ),
    map(([, buyData, rentData]) => fromGlobalActions.updateChartDatasets({ buyData, rentData }))
  ));

  updateChartDatasets$ = createEffect(() => this.actions$.pipe(
    ofType(fromGlobalActions.updateChartDatasets),
    withLatestFrom(
      this.store.select(selectChartType),
      this.store.select(selectXAxisMetric),
      this.store.select(selectYAxisMetric),
    ),
    map(([action, chartType, xAxis, yAxis]) => {
      const buyChart = this.chartService.createChartData(chartType, action.buyData, xAxis, yAxis);
      console.log(buyChart);
      const rentChart = this.chartService.createChartData(chartType, action.rentData, xAxis, yAxis);
      return fromGlobalActions.addChartDatasets({ buyChart: buyChart.datasets, rentChart: rentChart.datasets });
    })
  ));

  constructor(
    private actions$: Actions,
    private chartService: ChartService,
    private store: Store<AppState>,
  ) {}
}
