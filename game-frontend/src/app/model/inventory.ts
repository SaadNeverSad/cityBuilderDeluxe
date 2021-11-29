export class Inventory {
  houses: number = 1;
  windTurbines: number = 0;
  circuses: number = 0;
  fountains: number = 0;

  /**
   * Increases by one the count of every block in the inventory.
   */
  increase() {
    this.houses++;
    this.windTurbines++;
    this.circuses++;
    this.fountains++;
  }
}
