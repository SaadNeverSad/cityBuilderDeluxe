import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-game-bar',
  templateUrl: './game-bar.component.html',
  styleUrls: ['./game-bar.component.css'],
})
export class GameBarComponent implements OnInit {
  gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  endGame() {
    this.gameService.endGame();
  }

  ngOnInit(): void {}
}
