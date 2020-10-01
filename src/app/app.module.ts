import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';

import * as fromActions from '../store/reducers/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ChartContainerComponent } from './chart-container/chart-container.component';
import { SettingsContainerComponent } from './settings-container/settings-container.component';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { FranceEffects } from '../store/effects/effects';


@NgModule({
  declarations: [
    AppComponent,
    ChartContainerComponent,
    SettingsContainerComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ config: fromActions.reducer }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([FranceEffects]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
