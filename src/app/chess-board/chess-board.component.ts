import { Component, Input, OnInit } from '@angular/core';
import { Chessboard } from '../model/Chessboard';
import { Piece } from '../model/Piece';
import { Position } from '../model/Position';
import { Positions } from '../model/Positions';  

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})

export class ChessBoardComponent implements OnInit {
  @Input() chessboard: Chessboard;
  @Input() chessboards: Chessboard[]; 
  @Input() piece: Piece;
  @Input() pieces: Piece[];
  
  @Input() position: Position;
  
  tempPosition: Position;
  selectedPiece: number = 0;
  selectedTop: string = '';
  selectedLeft: string = '';
  
  private _tabPieces = { 
    '0' : '',
    '-6' : 'roin', '-5' : 'damn', '-4' : 'toun', '-3' : 'foun', '-2' : 'cavn', '-1' : 'pion',
    '6' : 'roib', '5' : 'damb', '4' : 'toub', '3' : 'foub', '2' : 'cavb', '1' : 'piob' 
  };
  
  private _getRelativeIndex(index: number) {
      return this.chessboard.Side ? (63 - index) : index;
  }
  
  calcCaseClass(index:number) {
    let sReturn = 'case ';

    sReturn += this.piece.Title + ' ';
    sReturn += this._tabPieces[this.position.diag[this._getRelativeIndex(index)].toString()];    
              
    return sReturn;
  }
  
  calcChessboardClass() {
    return 'board ' + this.chessboard.Title + ' ' + (this.chessboard.Side ? 'noir' : 'blanc');
  }
  
  calcSelectedClass() {
    let sReturn = 'selected ';
    
    sReturn += this.piece.Title + ' ';
    sReturn += this._tabPieces[this.selectedPiece.toString()];    
              
    return sReturn;
  }
  
  mousedownCase(event: MouseEvent, index: number) {
    event.preventDefault();
    
    let positions = new Positions(this.position);
    positions.generate();    
    
    if (this.isCasePlayable(positions, this._getRelativeIndex(index))) {
        this.tempPosition = new Position(this.position.diag, this.position.trait, this.position.roi, this.position.pr, this.position.gr, this.position.pep);
        
        this.selectedPiece = this.position.diag[this._getRelativeIndex(index)];
        this.position.diag[this._getRelativeIndex(index)] = 0;       
        this.selectedTop = event.clientY - 37.5 + 'px';
        this.selectedLeft = event.clientX  - 37.5 + 'px'; 
    }
  }
  
  mouseupCase(event: MouseEvent, index: number) {    
    event.preventDefault();
    
    this.selectedPiece = 0; 
    this.position = new Position(this.tempPosition.diag, this.tempPosition.trait, this.tempPosition.roi, this.tempPosition.pr, this.tempPosition.gr, this.tempPosition.pep);
  }
  
  mousemoveCase(event: MouseEvent, index: number) {
    event.preventDefault();
    if (this.selectedPiece !== 0) {        
        this.selectedTop = event.clientY - 37.5 + 'px';
        this.selectedLeft = event.clientX  - 37.5 + 'px';
    }         
  }
  
  mouseleaveBoard(event: MouseEvent) {
    event.preventDefault();
    if (this.selectedPiece !== 0) {
        this.selectedPiece = 0; 
        this.position = new Position(this.tempPosition.diag, this.tempPosition.trait, this.tempPosition.roi, this.tempPosition.pr, this.tempPosition.gr, this.tempPosition.pep);
    }
  }
  
  isCasePlayable(positions: Positions, index: number) {      
      return (this.position.trait && this.position.diag[index] > 0 
            ||!this.position.trait && this.position.diag[index] < 0)
       && positions.list.filter(v => v.diag[index] === 0).length > 0;
  }

  ngOnInit() {
  }

}
