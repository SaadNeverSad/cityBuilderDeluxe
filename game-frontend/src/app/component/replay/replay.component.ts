import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Replay } from 'src/app/model/replay';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.css'],
})
export class ReplayComponent implements OnInit {
  replays: Array<Replay> = [];
  err: boolean = false;
  map: string | null;

  constructor(
    public gameService: GameService,
    private router: Router,
    httpClient: HttpClient,
    route: ActivatedRoute
  ) {
    // get back to the register screen if no map is selected
    this.map = route.snapshot.paramMap.get('map');
    if (!this.map) {
      router.navigateByUrl('/register');
      return;
    }

    httpClient
      .get<Array<Replay>>('api/map/' + gameService.game.map.name + '/replays')
      .subscribe(
        (replays) => (this.replays = replays),
        (_) => (this.err = true)
      );
  }

  /**
   * Starts a replay.
   */
  view(playerName: string) {
    this.router.navigate(['/replay', this.map ?? '', playerName]);
  }

  ngOnInit(): void {}
}
