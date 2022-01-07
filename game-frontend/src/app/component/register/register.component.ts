import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(
    private snackBar:MatSnackBar,
    httpClient: HttpClient,
    public gameService: GameService,
    private router: Router
  ) {
    httpClient
      .get<Array<String>>('/api/map/availableMaps')
      .subscribe((maps) => (this.maps = maps));
  }

  showReplays() {
    if (this.gameService.game.map.name !== 'rand') {
      this.router.navigate(['replays', this.gameService.game.map.name]);
    }
  }

  play() {
    if (this.gameService.player.name) {
      this.router.navigateByUrl('/game');
    }
  }


  ngOnInit(): void {

  }

}
