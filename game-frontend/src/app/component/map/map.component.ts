import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import Map from '../../model/map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  ngOnInit(): void {}
}
