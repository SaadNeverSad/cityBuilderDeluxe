import { UndoableCommand } from 'interacto';
import { GrassTile } from '../model/grass-tile';
import Tile from '../model/tile';
import { GameService } from '../service/game.service';

/**
 * Undoable command to place a block on the map.
 */
export class AddBlock extends UndoableCommand {
  gameService: GameService;
  tile: GrassTile;

  constructor(tile: GrassTile, gameService: GameService) {
    super();
    this.gameService = gameService;
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
  }
  public undo(): void {
    this.tile.unset();
  }
}
