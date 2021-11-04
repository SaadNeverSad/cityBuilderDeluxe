class Inventory {
  houses: number = 12;
  windTurbines: number = 5;
  circuses: number = 4;
  fountains: number = 8;
}

export class Player {
  inventory: Inventory;

  constructor() {
    this.inventory = new Inventory();
  }
}
