import * as _ from 'lodash';
import Map from './map';
import { Replay } from './replay';

export enum GameStatus {
  NotEnded = '',
  EndedByEmptyInventory = 'Your inventory is empty!',
  EndedByMissingSpace = 'There is no space left on the map!',
  EndedBySurrender = 'You surrended!',
}

export class Game {
  ended: GameStatus = GameStatus.NotEnded;
  score: number = 0;
  scoreLimit: number = 10;
  turn: number = 1;
  map: Map = new Map();
  replay: Replay = new Replay();

  clone(): Game {
    return _.cloneDeep(this);
  }
}
