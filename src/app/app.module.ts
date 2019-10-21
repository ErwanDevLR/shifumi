import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerOneComponent } from './player-one/player-one.component';
import { PlayerTwoComponent } from './player-two/player-two.component';
import { ArbitratorComponent } from './arbitrator/arbitrator.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerOneComponent,
    PlayerTwoComponent,
    ArbitratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([

    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
