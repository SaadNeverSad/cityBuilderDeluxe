import { Component, OnInit } from '@angular/core';
import { Game, GameStatus } from 'src/app/model/game';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-game-bar',
  templateUrl: './game-bar.component.html',
  styleUrls: ['./game-bar.component.css'],
})
export class GameBarComponent implements OnInit {
  GameStatus = GameStatus;

  constructor(public gameService: GameService) {}

  endGame() {
    Object.assign(this.gameService, new GameService());
  }

  ngOnInit(): void {}
}
