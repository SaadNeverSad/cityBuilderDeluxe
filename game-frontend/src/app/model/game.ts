import Map from './map';

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
}
