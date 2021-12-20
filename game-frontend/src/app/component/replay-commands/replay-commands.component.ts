import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UndoHistory } from 'interacto';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-replay-commands',
  templateUrl: './replay-commands.component.html',
  styleUrls: ['./replay-commands.component.css'],
})
export class ReplayCommandsComponent implements OnInit {
  constructor(
    public gameService: GameService,
    private undoHistory: UndoHistory,
    private router: Router
  ) {}

  /**
   * Returns to the menu.
   */
  returnToMenu() {
    Object.assign(this.gameService, new GameService());
    this.undoHistory.clear();
    this.router.navigateByUrl('/register');
  }

  ngOnInit(): void {}
}
