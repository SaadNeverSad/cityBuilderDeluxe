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
import { GameBarComponent } from './component/game-bar/game-bar.component';
import { ScoreComponent } from './component/score/score.component';
import { RegisterComponent } from './component/register/register.component';
import { ScoreboardComponent } from './component/scoreboard/scoreboard.component';
import { InventoryComponent } from './component/inventory/inventory.component';
import { GameComponent } from './component/game/game.component';
import { EndComponent } from './component/end/end.component';
import { ReplayComponent } from './component/replay/replay.component';
import { ViewComponent } from './component/view/view.component';
import { ReplayCommandsComponent } from './component/replay-commands/replay-commands.component';





import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    ReplayComponent,
    AppComponent,
    MapComponent,
    InventoryComponent,
    GameBarComponent,
    ScoreComponent,
    ScoreboardComponent,
    RegisterComponent,
    GameComponent,
    EndComponent,
    ViewComponent,
    ReplayCommandsComponent,


  ],
  imports: [
   
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,

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
