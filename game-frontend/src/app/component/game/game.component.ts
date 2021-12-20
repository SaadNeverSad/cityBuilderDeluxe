import { Component, OnInit } from '@angular/core';
import { UndoHistory } from 'interacto';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  constructor(undoHistory: UndoHistory) {
    undoHistory.setSizeMax(100);
  }

  ngOnInit(): void {}
}
