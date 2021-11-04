import { Injectable } from '@angular/core';
import { Game } from '../model/game';
import { Player } from '../model/player';
import Tile from '../model/tile';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private game: Game;
  private player: Player;

  constructor() {
    this.game = new Game();
    this.player = new Player();
  }

  getTiles(): Tile[][] {
    return this.game.map.tiles;
  }

  getInventoryHouses(): number {
    return this.player.inventory.houses;
  }
  getInventoryWindTurbines(): number {
    return this.player.inventory.windTurbines;
  }
  getInventoryCircuses(): number {
    return this.player.inventory.circuses;
  }
  getInventoryFountains(): number {
    return this.player.inventory.fountains;
  }
}
