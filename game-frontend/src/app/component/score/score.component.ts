import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {
  constructor(public gameService: GameService) {}

  getScoreTitle(): string {
    return (
      'Score: ' +
      this.gameService.game.score +
      '/' +
      this.gameService.game.scoreLimit
    );
  }

  getProgressBar(): number {
    return (
      (this.gameService.game.score / this.gameService.game.scoreLimit) * 100
    );
  }

  ngOnInit(): void {}
}
