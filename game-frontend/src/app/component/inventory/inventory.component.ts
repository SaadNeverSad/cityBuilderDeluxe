import { Component, OnInit } from '@angular/core';
import { AnonCmd, PartialPointBinder } from 'interacto';
import { Block, BlockKind } from '../../model/block';
import { GameService } from '../../service/game.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  Object = Object;
  Block = Block;
  BlockKind = BlockKind;

  constructor(public gameService: GameService) {}

  public selectHouse(binder: PartialPointBinder): void {
    binder
      .toProduce(
        () =>
          new AnonCmd(
            () => (this.gameService.player.selectedBlock = BlockKind.House)
          )
      )
      .bind();
  }

  public selectWindTurbine(binder: PartialPointBinder): void {
    binder
      .toProduce(
        () =>
          new AnonCmd(
            () =>
              (this.gameService.player.selectedBlock = BlockKind.WindTurbine)
          )
      )
      .bind();
  }

  public selectCircus(binder: PartialPointBinder): void {
    binder
      .toProduce(
        () =>
          new AnonCmd(
            () => (this.gameService.player.selectedBlock = BlockKind.Circus)
          )
      )
      .bind();
  }

  public selectFountain(binder: PartialPointBinder): void {
    binder
      .toProduce(
        () =>
          new AnonCmd(
            () => (this.gameService.player.selectedBlock = BlockKind.Fountain)
          )
      )
      .bind();
  }

  public selectBlock(kind: string) {
    if (!this.gameService.isReplay) {
      this.gameService.player.selectedBlock = kind as BlockKind;
    }
  }

  ngOnInit(): void {}
}
