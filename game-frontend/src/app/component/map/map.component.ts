import { Component, OnInit } from '@angular/core';
import { AnonCmd, PartialPointBinder } from 'interacto';
import { AddBlock } from 'src/app/command/AddBlock';
import { Block, BlockKind } from 'src/app/model/block';
import { GrassTile } from 'src/app/model/grass-tile';
import { Player } from 'src/app/model/player';
import Tile from 'src/app/model/tile';
import { TreeTile } from 'src/app/model/tree-tile';
import { WaterTile } from 'src/app/model/water-tile';
import { GameService } from 'src/app/service/game.service';
import Map from '../../model/map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  gameService: GameService;

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

        return new AddBlock(tile, this.gameService);
      })
      .when((i) => i.button === 0)
      .bind();
  }

  public getAdjacScores(x: number, y: number) {
    let tree_tiles_num = 0;
    let water_tiles_num = 0;
    let circus_block_num = 0;
    let house_block_num = 0;
    let windTurbine_block_num = 0;
    let fountain_block_num = 0;
    let bonus = 0;

    for (let i = x - 1; i < x + 1; i++) {
      for (let j = y - 1; j < y + 1; j++) {
        if (x == i && y == j) {
          continue;
        }
        let tile = this.gameService.game.map.tiles[x][y];
        if (tile instanceof TreeTile) {
          tree_tiles_num++;
        }else if(tile instanceof WaterTile){
          water_tiles_num++;
        }
         else if (tile instanceof GrassTile) {
          if (tile.block?.kind === BlockKind.Circus) {
            circus_block_num++;
          }else if (tile.block?.kind === BlockKind.House) {
            house_block_num++;
          }else if (tile.block?.kind === BlockKind.WindTurbine) {
            windTurbine_block_num++;
          }else if (tile.block?.kind === BlockKind.Fountain) {
            fountain_block_num++;
          }
        }
      }
    }
    if(this.gameService.player.selectedBlock == BlockKind.House){
      bonus = 6 + 5*tree_tiles_num + 10*circus_block_num + 8*fountain_block_num - house_block_num - 12*windTurbine_block_num;
    }else if(this.gameService.player.selectedBlock == BlockKind.Circus){
      bonus = 8 - 25*circus_block_num + 15* house_block_num ;
    }else if(this.gameService.player.selectedBlock == BlockKind.Fountain){
      bonus = 6 + 6*circus_block_num + 8* house_block_num ;
    }else if(this.gameService.player.selectedBlock == BlockKind.WindTurbine){
      bonus = 15 - 8* house_block_num - 4*tree_tiles_num + 10*water_tiles_num;
    }
    return bonus;
  }
}
