import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/model/player';
import * as internal from 'stream';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  score:number;
  scoreLimit =200;
  progressBar : number;
  title:string;
  constructor() {
    this.score=100;
    this.progressBar=this.score/this.scoreLimit*100;
    this.title="Score: "+this.score+ "/"+this.scoreLimit;
  }

  ngOnInit(): void {
  }


}
