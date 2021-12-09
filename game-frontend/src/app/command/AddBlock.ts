import { UndoableCommand } from 'interacto';
import { BlockKind } from '../model/block';
import { GrassTile } from '../model/grass-tile';
import { GameService } from '../service/game.service';

/**
 * Undoable command to place a block on the map.
 */
export class AddBlock extends UndoableCommand {
  x: number;
  y: number;
  gameService: GameService;
  gameServiceSnapshot: GameService;
  scoreAdded: number;

  constructor(
    x: number,
    y: number,
    scoreAdded: number,
    gameService: GameService
  ) {
    super();
    this.gameService = gameService;

    // make a copy of the game service
    this.gameServiceSnapshot = this.gameService.clone();
    this.scoreAdded = scoreAdded;
    this.x = x;
    this.y = y;
  }

  protected execution(): void {
    this.redo();
  }
  public getUndoName(): string {
    return 'Add city block';
  }
  public redo(): void {
    let tile = this.gameService.game.map.tiles[this.x][this.y];
    if (!(tile instanceof GrassTile)) {
      return;
    }

    tile.set(this.gameService.player.selectedBlock);

    // decrement the inventory count
    let tileKind = tile.block?.kind;
    if (tileKind === BlockKind.House) {
      this.gameService.player.inventory.houses--;
    } else if (tileKind === BlockKind.WindTurbine) {
      this.gameService.player.inventory.windTurbines--;
    } else if (tileKind === BlockKind.Circus) {
      this.gameService.player.inventory.circuses--;
    } else if (tileKind === BlockKind.Fountain) {
      this.gameService.player.inventory.fountains--;
    }

    // check if we need a new turn
    let scoreAdded = this.scoreAdded;
    while (
      this.gameService.game.score + scoreAdded >=
      this.gameService.game.scoreLimit
    ) {
      this.gameService.game.turn++;
      this.gameService.player.inventory.increase();
      scoreAdded -=
        this.gameService.game.scoreLimit - this.gameService.game.score;
      this.gameService.game.score = this.gameService.game.scoreLimit;
      this.gameService.game.scoreLimit += 10 * this.gameService.game.turn;
    }

    this.gameService.game.score = this.gameService.game.score + scoreAdded;
  }
  public undo(): void {
    Object.assign(this.gameService, this.gameServiceSnapshot);
    this.gameServiceSnapshot = this.gameService.clone();
  }
}
