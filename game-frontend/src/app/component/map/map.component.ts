import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnonCmd, PartialPointBinder } from 'interacto';
import { AddBlock } from 'src/app/command/AddBlock';
import { Block, BlockKind } from 'src/app/model/block';
import { GrassTile } from 'src/app/model/grass-tile';
import { BackendMap } from 'src/app/model/map';
import { Move } from 'src/app/model/replay';
import { TreeTile } from 'src/app/model/tree-tile';
import { WaterTile } from 'src/app/model/water-tile';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  // the hovered tile coordinates, as a tuple.
  // if no tile is hovered, this is null.
  hovered: [number, number] | null = null;
  Block = Block;

  constructor(
    public gameService: GameService,
    httpClient: HttpClient,
    router: Router
  ) {
    // if the player name is empty, then the user probably directly accessed
    // "/game" and has not choosen a map yet.
    if (gameService.player.name === '') {
      router.navigateByUrl('/register');
      return;
    }

    let apiCall;
    // ask the backend to create a random map
    if (gameService.game.map.name === 'rand') {
      apiCall = 'api/map/newMap';
    } else {
      apiCall = 'api/map/' + gameService.game.map.name;
    }

    httpClient.get<BackendMap>(apiCall).subscribe((map) => {
      for (let x in map.tiles) {
        for (let y in map.tiles[x]) {
          let tile;
          if (map.tiles[x][y] == 'water') {
            tile = new WaterTile();
          } else if (map.tiles[x][y] == 'tree') {
            tile = new TreeTile();
          } else {
            tile = new GrassTile();
          }

          gameService.game.map.tiles[x][y] = tile;
        }
      }

      gameService.game.map.name = map.name;
      gameService.game.map.isLoaded.next();
    });
  }

  ngOnInit(): void {}

  /**
   * Handles a click to add a block.
   * @param binder the binder
   */
  public addBlock(binder: PartialPointBinder): void {
    binder
      .toProduce((i) => {
        const elt = i.currentTarget as Element;
        const x = parseInt(elt.getAttribute('data-x') ?? '0', 0);
        const y = parseInt(elt.getAttribute('data-y') ?? '0', 0);

        let tile = this.gameService.game.map.tiles[x][y];
        let player = this.gameService.player;

        // if this is a replay prevent the user from placing a block
        if (this.gameService.isReplay) {
          return new AnonCmd(() => {});
        }

        // we can't place a block if it's not a grass tile
        if (!(tile instanceof GrassTile)) {
          return new AnonCmd(() => {});
        }

        // make sure the block count allows to place this block
        if (player.inventory.blocks[player.selectedBlock] === 0) {
          return new AnonCmd(() => {});
        }

        // if a block is already set, don't do anything
        if (tile.block !== null) {
          return new AnonCmd(() => {});
        }

        let scoreAdded = this.getScoreAdded();
        this.hovered = null;

        // register the move in the replay
        this.gameService.game.replay.addMove(
          new Move(this.gameService.player.selectedBlock, x, y, scoreAdded)
        );

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
}
