import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { GameComponent } from './component/game/game.component';
import { ReplayComponent } from './component/replay/replay.component';
import { ViewComponent } from './component/view/view.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'game', component: GameComponent },
  { path: 'replays/:map', component: ReplayComponent },
  { path: 'replay/:map/:player', component: ViewComponent },
  { path: '**', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
