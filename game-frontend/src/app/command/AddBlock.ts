import { UndoableCommand } from 'interacto';
import { BlockKind } from '../model/block';
import { GrassTile } from '../model/grass-tile';
import { Inventory } from '../model/inventory';
import Tile from '../model/tile';
import { GameService } from '../service/game.service';

/**
 * Undoable command to place a block on the map.
 */
export class AddBlock extends UndoableCommand {
  gameService: GameService;
  tile: GrassTile;
  inventory: Inventory;
  score: number;
  scoreLimit: number;

  constructor(tile: GrassTile, gameService: GameService) {
    super();
    this.gameService = gameService;
    // deep copy
    this.inventory = { ...gameService.player.inventory };
    this.score = gameService.game.score;
    this.scoreLimit = gameService.game.scoreLimit;
    this.tile = tile;
  }

  protected execution(): void {
    this.redo();
  }
  public getUndoName(): string {
    return 'Add city block';
  }
  public redo(): void {
    this.tile.set(this.gameService.player.selectedBlock);

    let tileKind = this.tile.block?.kind;
    if (tileKind === BlockKind.House) {
      this.inventory.houses--;
    } else if (tileKind === BlockKind.WindTurbine) {
      this.inventory.windTurbines--;
    } else if (tileKind === BlockKind.Circus) {
      this.inventory.circuses--;
    } else if (tileKind === BlockKind.Fountain) {
      this.inventory.fountains--;
    } else {
      console.log('branche cheloy ');
    }

    this.gameService.player.inventory = { ...this.inventory };
    /*
      METTRE A JOUR LE SCORE
    */

  }
  public undo(): void {
    let tileKind = this.tile.block?.kind;

    if (tileKind === BlockKind.House) {
      this.inventory.houses++;
    } else if (tileKind === BlockKind.WindTurbine) {
      this.inventory.windTurbines++;
    } else if (tileKind === BlockKind.Circus) {
      this.inventory.circuses++;
    } else if (tileKind === BlockKind.Fountain) {
      this.inventory.fountains++;
    }

    this.gameService.game.score = this.score;
    this.gameService.game.scoreLimit = this.scoreLimit;
    this.gameService.player.inventory = { ...this.inventory };
    this.tile.unset();
  }
}
