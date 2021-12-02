import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css'],
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
export class ScoreboardComponent implements OnInit {
  gameService: GameService;
  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  ngOnInit(): void {}
}
