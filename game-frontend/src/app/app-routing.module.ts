import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MapComponent } from './component/map/map.component';
import { RegisterComponent } from './component/register/register.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {path: 'register' ,component : RegisterComponent},
  {path: 'game' ,component : GameComponent},
  {path:'',
  redirectTo:'/register',
  pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
