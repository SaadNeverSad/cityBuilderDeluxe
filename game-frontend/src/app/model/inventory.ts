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

  /**
   * Returns true if the inventory is empty.
   */
  empty() {
    return (
      this.houses === 0 &&
      this.windTurbines === 0 &&
      this.circuses === 0 &&
      this.fountains === 0
    );
  }
}
