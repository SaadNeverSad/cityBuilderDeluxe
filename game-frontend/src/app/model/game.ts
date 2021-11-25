import Map from './map';

export class Game {
  score: number = 0;
  scoreLimit: number = 0;
  turn: number = 1;
  map: Map;

  constructor() {
    this.map = new Map();
  }
}
