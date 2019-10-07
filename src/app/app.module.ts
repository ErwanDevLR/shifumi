import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
