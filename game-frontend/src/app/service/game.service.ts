import { Injectable } from '@angular/core';
import { Game } from '../model/game';
import Tile from '../model/tile';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private game: Game;

  constructor() {
    this.game = new Game();
  }

  getTiles(): Tile[][] {
    return this.game.map.tiles;
  }
}
