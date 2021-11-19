import { Component, OnInit } from '@angular/core';
import { AnonCmd, PartialPointBinder } from 'interacto';
import { AddBlock } from 'src/app/command/AddBlock';
import { Block, BlockKind } from 'src/app/model/block';
import { GrassTile } from 'src/app/model/grass-tile';
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
          player.selectedBlock == BlockKind.House &&
          player.inventory.houses > 0
        ) {
          player.inventory.houses--;
        } else if (
          player.selectedBlock == BlockKind.WindTurbine &&
          player.inventory.windTurbines > 0
        ) {
          player.inventory.windTurbines--;
        } else if (
          player.selectedBlock == BlockKind.Circus &&
          player.inventory.circuses > 0
        ) {
          player.inventory.circuses--;
        } else if (
          player.selectedBlock == BlockKind.Fountain &&
          player.inventory.fountains > 0
        ) {
          player.inventory.fountains--;
        } else {
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
}
