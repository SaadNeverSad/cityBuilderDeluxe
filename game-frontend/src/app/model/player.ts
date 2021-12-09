import { BlockKind } from './block';
import { Inventory } from './inventory';

export class Player {
  name: string = '';
  selectedBlock: BlockKind = BlockKind.House;
  inventory: Inventory = new Inventory();
}
