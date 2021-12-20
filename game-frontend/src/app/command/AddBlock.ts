import { UndoableCommand } from 'interacto';
import { BlockKind } from '../model/block';
import { Game, GameStatus } from '../model/game';
import { GrassTile } from '../model/grass-tile';
import { Player } from '../model/player';
import { GameService } from '../service/game.service';

/**
 * Checks if the game has ended.
 * The game ends if the user can't place any block (no space left / no block left)
 */
function gameEnded(game: Game, player: Player): GameStatus {
  // no block left
  if (player.inventory.empty()) {
    return GameStatus.EndedByEmptyInventory;
  }

  // no space left
  for (let row of game.map.tiles) {
    for (let tile of row) {
      if (tile.selectable) {
        return GameStatus.NotEnded;
      }
    }
  }

  return GameStatus.EndedByMissingSpace;
}

/**
 * Undoable command to place a block on the map.
 */
export class AddBlock extends UndoableCommand {
  x: number;
  y: number;
  game: Game;
  player: Player;
  gameSave: Game;
  playerSave: Player;
  scoreAdded: number;

  constructor(
    x: number,
    y: number,
    scoreAdded: number,
    gameService: GameService
  ) {
    super();
    this.game = gameService.game;
    this.player = gameService.player;

    // make a copy of the game service
    this.gameSave = this.game.clone();
    this.playerSave = this.player.clone();
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
    let tile = this.game.map.tiles[this.x][this.y];

    if (!(tile instanceof GrassTile)) {
      return;
    }

    tile.set(this.playerSave.selectedBlock);

    // decrement the inventory count
    this.player.inventory.blocks[this.playerSave.selectedBlock]--;

    // check if we need a new turn
    let scoreAdded = this.scoreAdded;
    while (this.game.score + scoreAdded >= this.game.scoreLimit) {
      this.game.turn++;
      this.player.inventory.increase();
      scoreAdded -= this.game.scoreLimit - this.game.score;
      this.game.score = this.game.scoreLimit;
      this.game.scoreLimit += 10 * this.game.turn;
    }

    this.game.score = this.game.score + scoreAdded;

    // check if the game is finished
    this.game.ended = gameEnded(this.game, this.player);
  }

  public undo(): void {
    Object.assign(this.game, this.gameSave);
    Object.assign(this.player, this.playerSave);
    this.gameSave = this.game.clone();
    this.playerSave = this.player.clone();
  }
}
