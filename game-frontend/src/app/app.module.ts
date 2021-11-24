import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InteractoModule } from 'interacto-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './component/map/map.component';
import { InventoryComponent } from './inventory/inventory.component';
import { GameBarComponent } from './component/game-bar/game-bar.component';
import { ScoreComponent } from './component/score/score.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { Score } from './model/score';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    InventoryComponent,
    GameBarComponent,
    ScoreComponent,
  ],
  imports: [InteractoModule, BrowserModule, AppRoutingModule,NgCircleProgressModule.forRoot({
    // set defaults here
    radius: 200,
    outerStrokeWidth: 16,
    innerStrokeWidth: 8,
    outerStrokeColor: "#78C000",
    innerStrokeColor: "#C7E596",
    animationDuration: 300,
    showSubtitle: false,
    //title : "Score :",
    //showInnerStroke: false,
    showUnits: false
  })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
