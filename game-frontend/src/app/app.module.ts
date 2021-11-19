import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InteractoModule } from 'interacto-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './component/map/map.component';
import { InventoryComponent } from './inventory/inventory.component';
import { GameBarComponent } from './component/game-bar/game-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    InventoryComponent,
    GameBarComponent,
  ],
  imports: [InteractoModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
