import { Block, BlockKind } from './block';
import Tile from './tile';

export class GrassTile extends Tile {
  src: string = 'assets/empty.svg';
  selectable: boolean = true;

  block: null | Block = null;

  /**
   * Sets a block on the tile.
   */
  set(kind: BlockKind) {
    this.selectable = false;
    this.block = new Block(kind);
    this.src = Block.assetPath(kind);
  }
}
