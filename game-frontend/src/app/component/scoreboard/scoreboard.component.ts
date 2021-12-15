import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { GameService } from 'src/app/service/game.service';
import { HttpClient } from '@angular/common/http';
import { BackendScore } from 'src/app/model/score';

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
  bestScores: Array<BackendScore> = [];

  constructor(public gameService: GameService, httpClient: HttpClient) {
    httpClient
      .get<Array<BackendScore>>(
        '/api/map/' + gameService.game.map.name + '/bestScores'
      )
      .subscribe((bestScores) => (this.bestScores = bestScores));
  }

  ngOnInit(): void {}
}
