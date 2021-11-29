import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { Game } from '../model/game';
import { Player } from '../model/player';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game: Game;
  player: Player;

  constructor() {
    this.game = new Game();
    this.player = new Player();
  }

  clone(): GameService {
    return _.cloneDeep(this);
  }
}
