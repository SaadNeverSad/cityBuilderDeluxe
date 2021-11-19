import { BlockKind } from './block';
import { Inventory } from './inventory';

export class Player {
  selectedBlock: BlockKind = BlockKind.House;
  inventory: Inventory = new Inventory();
}
