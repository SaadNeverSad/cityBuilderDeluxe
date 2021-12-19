import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UndoHistory } from 'interacto';
import { AddBlock } from 'src/app/command/AddBlock';
import { Undoable } from 'src/app/model/undoable';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.css']
})
export class ReplayComponent implements OnInit {

  undos: readonly Undoable[];
  
  constructor(public undoHistory: UndoHistory,private http: HttpClient) {
    this.undos = undoHistory.getUndo();   
  }

  ngOnInit(): void {
    
  }

  public postReplay(): Promise<void> {
    return this.http
    // You can (must) join data to your post queries.
    // Use JSON.stringify to marshall data
    .post<void>('game/replay', JSON.stringify(this.undos))
    .toPromise();
  }
  
     
}
