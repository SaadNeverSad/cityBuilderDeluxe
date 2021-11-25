import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {
  progressBar: number;
  title: string;
  constructor(gameService: GameService) {
    this.progressBar =
      (gameService.game.score / gameService.game.scoreLimit) * 100;
    this.title =
      'Score: ' + gameService.game.score + '/' + gameService.game.scoreLimit;
  }

  ngOnInit(): void {}
}
