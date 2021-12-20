import { BlockKind } from './block';

export class Move {
  block: BlockKind;
  blockX: number;
  blockY: number;
  scoreAdded: number;

  constructor(
    block: BlockKind,
    blockX: number,
    blockY: number,
    scoreAdded: number
  ) {
    this.block = block;
    this.blockX = blockX;
    this.blockY = blockY;
    this.scoreAdded = scoreAdded;
  }
}

export class Replay {
  playerName: string = '';
  score: number = 0;
  moves: Array<Move> = [];

  addMove(move: Move) {
    this.moves.push(move);
  }
}
