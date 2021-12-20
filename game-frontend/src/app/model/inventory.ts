import { Block, BlockKind } from './block';

export class Inventory {
  blocks: { [key in BlockKind]: number } = {
    [BlockKind.House]: 1,
    [BlockKind.WindTurbine]: 0,
    [BlockKind.Fountain]: 0,
    [BlockKind.Circus]: 0,
  };

  /**
   * Increases by one the count of every block in the inventory.
   */
  increase() {
    for (let val of Object.values(BlockKind)) {
      this.blocks[val]++;
    }
  }

  /**
   * Returns true if the inventory is empty.
   */
  empty() {
    for (let val of Object.values(this.blocks)) {
      if (val !== 0) {
        return false;
      }
    }

    return true;
  }
}
