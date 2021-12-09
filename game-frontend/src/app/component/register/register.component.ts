import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Map from 'src/app/model/map';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  maps: Array<String> = [];
  gameService: GameService;

  constructor(httpClient: HttpClient, gameService: GameService) {
    this.gameService = gameService;
    httpClient
      .get<Array<String>>('/api/map/availableMaps')
      .subscribe((maps) => (this.maps = maps));
  }

  ngOnInit(): void {}
}
