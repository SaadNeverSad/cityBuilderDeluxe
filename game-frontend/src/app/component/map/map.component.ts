import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { AnonCmd, PartialPointBinder } from 'interacto';
import { AddBlock } from 'src/app/command/AddBlock';
import { Block, BlockKind } from 'src/app/model/block';
import { GrassTile } from 'src/app/model/grass-tile';
import { TreeTile } from 'src/app/model/tree-tile';
import { WaterTile } from 'src/app/model/water-tile';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  gameService: GameService;

  // the hovered tile coordinates, as a tuple.
  // if no tile is hovered, this is null.
  hovered: [number, number] | null = null;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  ngOnInit(): void {}

  public addBlock(binder: PartialPointBinder): void {
    binder
      .toProduce((i) => {
        const elt = i.currentTarget as Element;
        const x = parseInt(elt.getAttribute('data-x') ?? '0', 0);
        const y = parseInt(elt.getAttribute('data-y') ?? '0', 0);

        let tile = this.gameService.game.map.tiles[x][y];
        let player = this.gameService.player;

        // we can't place a block if it's not a grass tile
        if (!(tile instanceof GrassTile)) {
          return new AnonCmd(() => {});
        }

        // make sure the block count allows to place this block
        if (
          (player.selectedBlock === BlockKind.House &&
            player.inventory.houses === 0) ||
          (player.selectedBlock === BlockKind.WindTurbine &&
            player.inventory.windTurbines === 0) ||
          (player.selectedBlock === BlockKind.Circus &&
            player.inventory.circuses === 0) ||
          (player.selectedBlock === BlockKind.Fountain &&
            player.inventory.fountains === 0)
        ) {
          return new AnonCmd(() => {});
        }

        // if a block is already set, don't do anything
        if (tile.block !== null) {
          return new AnonCmd(() => {});
        }

        let scoreAdded = this.getScoreAdded();
        this.hovered = null;
        return new AddBlock(x, y, scoreAdded, this.gameService);
      })
      .when((i) => i.button === 0)
      .bind();
  }

  setHovered(x: number, y: number) {
    let tile = this.gameService.game.map.tiles[x][y];
    if (!tile.selectable) {
      return;
    }

    this.hovered = [x, y];
  }

  removeHovered() {
    this.hovered = null;
  }

  /**
   * Gets the score of a tile, given the kind of block being set.
   * @param tile The tile to calculate the score
   * @param blockKind The block being placed
   * @returns The score of the tile. Returns 0 if the tile is out of the map.
   */
  public getTileScore(x: number, y: number): number {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      return 0;
    }

    let tile = this.gameService.game.map.tiles[x][y];
    let blockKind = this.gameService.player.selectedBlock;

    // the hovered tile is this tile.
    // don't return the bonus but the base score.
    if (this.hovered && this.hovered[0] === x && this.hovered[1] === y) {
      if (blockKind === BlockKind.House || blockKind === BlockKind.Fountain) {
        return 6;
      } else if (blockKind === BlockKind.Circus) {
        return 8;
      } else if (blockKind === BlockKind.WindTurbine) {
        return 15;
      }
    }

    if (blockKind === BlockKind.House) {
      if (tile instanceof TreeTile) {
        return 5;
      }

      // water tile
      if (!(tile instanceof GrassTile)) {
        return 0;
      }

      // empty grass tile
      if (!tile.block) {
        return 0;
      }

      if (tile.block.kind === BlockKind.Circus) {
        return 10;
      }

      if (tile.block.kind === BlockKind.Fountain) {
        return 8;
      }

      if (tile.block.kind === BlockKind.House) {
        return -1;
      }

      if (tile.block.kind === BlockKind.WindTurbine) {
        return -12;
      }
    } else if (blockKind === BlockKind.Circus) {
      if (!(tile instanceof GrassTile)) {
        return 0;
      }

      if (!tile.block) {
        return 0;
      }

      if (tile.block.kind === BlockKind.Circus) {
        return -25;
      }

      if (tile.block.kind === BlockKind.House) {
        return 15;
      }
    } else if (blockKind === BlockKind.Fountain) {
      if (!(tile instanceof GrassTile)) {
        return 0;
      }

      if (!tile.block) {
        return 0;
      }

      if (tile.block.kind === BlockKind.Circus) {
        return 6;
      }

      if (tile.block.kind === BlockKind.House) {
        return 8;
      }
    } else if (blockKind === BlockKind.WindTurbine) {
      if (tile instanceof TreeTile) {
        return -4;
      }

      if (tile instanceof WaterTile) {
        return 10;
      }

      if (tile instanceof GrassTile && tile.block?.kind === BlockKind.House) {
        return -8;
      }
    }

    return 0;
  }

  public getScoreAdded(): number {
    if (this.hovered === null) {
      throw new Error('Placing a block whitout hovering one!');
    }

    let radius = new Block(this.gameService.player.selectedBlock).radius;

    let score = 0;
    for (let i = this.hovered[0] - radius; i <= this.hovered[0] + radius; i++) {
      for (
        let j = this.hovered[1] - radius;
        j <= this.hovered[1] + radius;
        j++
      ) {
        score += this.getTileScore(i, j);
      }
    }
    return score;
  }

  /**
   * Returns true if this tile is adjacent to the block being set.
   * @param x The X coordinate of the tile
   * @param y The Y coordinate of the tile
   */
  public isAdjacent(x: number, y: number) {
    if (this.hovered === null) {
      return false;
    }

    let radius = new Block(this.gameService.player.selectedBlock).radius;

    if (
      this.hovered[0] - radius <= x &&
      this.hovered[0] + radius >= x &&
      this.hovered[1] - radius <= y &&
      this.hovered[1] + radius >= y
    ) {
      return true;
    }

    return false;
  }

  // /**
  //  * Gets the bonuses given by the adjacent tiles of the block
  //  * trying to be set, for a set of coordinates.
  //  * @param block The block trying to be set
  //  * @param x X coordinate
  //  * @param y Y coordinate
  //  * @returns A two-dimensionnal array of adjacent bonuses.
  //  * Returns null instead of the bonus if there is no adjacent tile at these coordinates.
  //  */
  // public (
  //   block: Block,
  //   x: number,
  //   y: number
  // ): Array<Array<number | null>> {
  //   let bonuses = new Array(2 * block.radius + 1);
  //   for (let i = 0; i < bonuses.length; i++) {
  //     bonuses[i] = new Array(2 * block.radius + 1);
  //   }

  //   // count the adjacent tiles / blocks
  //   for (let i = x - block.radius; i < x + block.radius; i++) {
  //     for (let j = y - block.radius; j < y + block.radius; j++) {
  //       // don't calculate the bonus on the tile we're setting the block
  //       if (x == i && y == j) {
  //         continue;
  //       }

  //       let tile = this.gameService.game.map.tiles[x][y];

  //       // if the tile is out of the game map, the bonus is null
  //       if (tile === undefined) {
  //         bonuses[i][j] = null;
  //         continue;
  //       }

  //       bonuses[i][j] = this.getBonus(tile, block.kind);
  //     }
  //   }

  //   return bonuses;
  // }
}
