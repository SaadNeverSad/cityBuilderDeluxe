import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, GameStatus } from '../model/game';
import { Player } from '../model/player';
import { Replay } from '../model/replay';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game: Game = new Game();
  player: Player = new Player();
  isReplay: boolean = false;
}
