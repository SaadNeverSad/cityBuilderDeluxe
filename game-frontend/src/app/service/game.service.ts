import { Injectable } from '@angular/core';
import { Game } from '../model/game';
import { Player } from '../model/player';
import Tile from '../model/tile';

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

  // Ends the game.
  endGame() {
    this.game = new Game();
    this.player = new Player();
  }
}
