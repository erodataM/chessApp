import { Component, OnInit, Input } from '@angular/core';
import { Chessboard } from '../model/Chessboard';
import { Piece } from '../model/Piece'; 

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() chessboard: Chessboard;
  @Input() chessboards: Chessboard[]; 
  @Input() piece: Piece;
  @Input() pieces: Piece[];
    
  constructor() { }

  ngOnInit() { }

}
