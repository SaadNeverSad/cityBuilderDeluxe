import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { Game, GameStatus } from '../model/game';
import { Player } from '../model/player';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game: Game = new Game();
  player: Player = new Player();

  clone(): GameService {
    return _.cloneDeep(this);
  }

  /**
   * Checks if the game is ended.
   * The game ends if the user can't place any block (no space left / no block left)
   */
  gameEnded(): GameStatus {
    // no block left
    if (this.player.inventory.empty()) {
      return GameStatus.EndedByEmptyInventory;
    }

    // no space left
    for (let row of this.game.map.tiles) {
      for (let tile of row) {
        if (tile.selectable) {
          return GameStatus.NotEnded;
        }
      }
    }

    return GameStatus.EndedByMissingSpace;
  }
}
