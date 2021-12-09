import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InteractoModule } from 'interacto-angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MapComponent } from './component/map/map.component';
import { InventoryComponent } from './inventory/inventory.component';
import { GameBarComponent } from './component/game-bar/game-bar.component';
import { ScoreComponent } from './component/score/score.component';
import { RegisterComponent } from './component/register/register.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    InventoryComponent,
    GameBarComponent,
    ScoreComponent,
    RegisterComponent,
    GameComponent,
  ],
  imports: [
    FormsModule,
    InteractoModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 200,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
      showSubtitle: false,
      startFromZero: false,
      //title : "Score :",
      //showInnerStroke: false,
      showUnits: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
