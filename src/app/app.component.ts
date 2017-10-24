import { Component } from '@angular/core';
import { Chessboard } from './model/Chessboard';
import { Piece } from './model/Piece'; 

import { Position } from './model/Position';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  chessboard: Chessboard = new Chessboard("babinga", false);
  chessboards: Chessboard[] = [
    new Chessboard("babinga", false),
    new Chessboard("erable", false),
    new Chessboard("metal", false)
  ]; 
  
  piece: Piece = new Piece('crystal');
  pieces: Piece[] = [
    new Piece('crystal'),
    new Piece('oldstyle'),
    new Piece('fritz'),
    new Piece('habsburg'),
  ]
  
  position: Position = Position.getPositionFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -');
  
  constructor() {
       console.log(this.position);
  }
}
