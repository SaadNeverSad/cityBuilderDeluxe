import Tile from './tile';
import { GrassTile } from './grass-tile';
import { WaterTile } from './water-tile';
import { TreeTile } from './tree-tile';
import { ScoreBoard } from './score-board';

export default class Map {
  scoreboard: ScoreBoard;
  tiles: Tile[][];

  static createRandomTile(): Tile {
    let rand = Math.floor(Math.random() * 3);

    if (rand == 0) {
      return new WaterTile();
    } else if (rand == 1) {
      return new GrassTile();
    } else {
      return new TreeTile();
    }
  }

  constructor() {
    this.scoreboard = new ScoreBoard();
    this.tiles = new Array(10);
    for (let i = 0; i < 10; i++) {
      this.tiles[i] = new Array(10);
      for (let j = 0; j < 10; j++) {
        this.tiles[i][j] = Map.createRandomTile();
      }
    }
  }
}
