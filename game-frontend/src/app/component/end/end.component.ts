import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { GameService } from 'src/app/service/game.service';
import { Router } from '@angular/router';
import { GameStatus } from 'src/app/model/game';
import { UndoHistory } from 'interacto';
import { HttpClient } from '@angular/common/http';
import { BackendScore } from 'src/app/model/score';
import { Replay } from 'src/app/model/replay';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css'],
  animations: [
    trigger('slide', [
      state('hide', style({ top: '-300px' })),
      state('show', style({ top: '50%' })),
      transition('hide => show', [animate('0.5s ease-out')]),
      transition('show => hide', [animate('0.3s ease-in')]),
    ]),

    trigger('focus', [
      state('hide', style({ opacity: '0', 'pointer-events': 'none' })),
      state('show', style({ opacity: '1', 'pointer-events': 'all' })),
      transition('hide => show', [animate('0.5s ease-out')]),
      transition('show => hide', [animate('0.3s ease-in')]),
    ]),
  ],
})
export class EndComponent implements OnInit {
  GameStatus = GameStatus;

  constructor(
    public gameService: GameService,
    private router: Router,
    private undoHistory: UndoHistory,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {}

  /**
   * Returns to the menu and sends the game to the backend.
   */
  returnToMenu() {
    // post the replay
    this.gameService.game.replay.playerName = this.gameService.player.name;
    this.gameService.game.replay.score = this.gameService.game.score;

    this.httpClient
      .post<Replay>(
        '/api/map/' + this.gameService.game.map.name + '/replay',
        this.gameService.game.replay
      )
      .subscribe();

    // then erase the game
    let mapName = this.gameService.game.map.name;
    let playerName = this.gameService.player.name;
    Object.assign(this.gameService, new GameService());
    this.gameService.player.name = playerName;
    this.gameService.game.map.name = mapName;
    this.undoHistory.clear();
    this.router.navigateByUrl('/register');
  }
}
