import * as _ from 'lodash';
import { BlockKind } from './block';
import { Inventory } from './inventory';

export class Player {
  name: string = '';
  selectedBlock: BlockKind = BlockKind.House;
  inventory: Inventory = new Inventory();

  clone(): Player {
    return _.cloneDeep(this);
  }
}
