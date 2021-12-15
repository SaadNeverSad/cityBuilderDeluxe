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
import { Game, GameStatus } from 'src/app/model/game';
import { UndoHistory } from 'interacto';

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
    private undoHistory: UndoHistory
  ) {}

  ngOnInit(): void {}

  /**
   * Returns to the menu and sends the game to the backend.
   */
  returnToMenu() {
    // make sure first to erase the game
    let playerName = this.gameService.player.name;
    Object.assign(this.gameService, new GameService());
    this.gameService.player.name = playerName;
    this.undoHistory.clear();
    this.router.navigateByUrl('/');
  }
}
