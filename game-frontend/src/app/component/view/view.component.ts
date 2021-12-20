import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UndoHistory } from 'interacto';
import { AddBlock } from 'src/app/command/AddBlock';
import { BlockKind } from 'src/app/model/block';
import { Replay } from 'src/app/model/replay';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  constructor(
    route: ActivatedRoute,
    router: Router,
    gameService: GameService,
    httpClient: HttpClient,
    undoHistory: UndoHistory
  ) {
    let map = route.snapshot.paramMap.get('map');
    let player = route.snapshot.paramMap.get('player');

    if (player === null || map === null) {
      router.navigateByUrl('/register');
      return;
    }

    undoHistory.setSizeMax(100);

    gameService.isReplay = true;
    gameService.game.map.name = map;
    gameService.player.name = player;

    // wait until the map is loaded
    gameService.game.map.isLoaded.subscribe(() => {
      httpClient
        .get<Replay>('api/map/' + map + '/replay/' + player)
        .subscribe((replay) => {
          for (let move of replay.moves) {
            gameService.player.selectedBlock = move.block;
            let action = new AddBlock(
              move.blockX,
              move.blockY,
              move.scoreAdded,
              gameService
            );

            // execute all moves the player has made to get the right `Game` and `Player` objects
            action.redo();
            // add these moves to the undo history
            undoHistory.add(action);
          }

          // undo all these moves to start with a clean state
          let undoLength = undoHistory.getUndo().length;
          for (let i = 0; i < undoLength; i++) {
            undoHistory.undo();
          }
        });
    });
  }

  ngOnInit(): void {}
}
