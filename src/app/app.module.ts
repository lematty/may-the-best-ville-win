import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import * as fromGlobalActions from '../store/reducers/global.reducer';
import * as fromFranceActions from '../store/reducers/france.reducer';
import * as fromUSActions from '../store/reducers/us.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ChartContainerComponent } from './chart-container/chart-container.component';
import { SettingsContainerComponent } from './settings-container/settings-container.component';
import { EffectsModule } from '@ngrx/effects';
import { ChartEffects } from '../store/effects/chart.effects';
import { FranceEffects } from '../store/effects/france.effects';
import { GlobalEffects } from '../store/effects/global.effects';
import { ScatterChartComponent } from './scatter-chart/scatter-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartContainerComponent,
    SettingsContainerComponent,
    ScatterChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({
      globalState: fromGlobalActions.reducer,
      franceState: fromFranceActions.reducer,
      usState: fromUSActions.reducer
    }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([ChartEffects, FranceEffects, GlobalEffects]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
