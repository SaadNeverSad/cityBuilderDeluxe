import Tile from './tile';
import { GrassTile } from './grass-tile';
import { WaterTile } from './water-tile';
import { TreeTile } from './tree-tile';
import { ScoreBoard } from './score-board';
import { Subject } from 'rxjs';

export class BackendMap {
  name: String = '';
  tiles: Array<Array<String>> = [];
}

export default class Map {
  isLoaded: Subject<undefined> = new Subject();
  name: String;
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
    this.name = 'rand';
    this.scoreboard = new ScoreBoard();
    this.tiles = new Array(10);

    for (let i = 0; i < 10; i++) {
      this.tiles[i] = new Array(10);
      for (let j = 0; j < 10; j++) {
        this.tiles[i][j] = new TreeTile();
      }
    }
  }
}
