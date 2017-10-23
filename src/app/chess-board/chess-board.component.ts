import { Component, Input, OnInit } from '@angular/core';
import { Chessboard } from '../model/Chessboard';
import { Piece } from '../model/Piece';
import { Tools } from '../model/Tools';
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
  selectedCase: number = -1;
  selectedTop: string = '';
  selectedLeft: string = '';
  ghosts: number[] = [];
  
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
    
    if (this.ghosts.indexOf(this._getRelativeIndex(index)) >= 0) {        
        sReturn += this._tabPieces[this.selectedPiece] + ' ghost';
    } else {
        sReturn += this._tabPieces[this.position.diag[this._getRelativeIndex(index)].toString()];
    }
              
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
  
  getGhosts(index:number) {
    let positions = new Positions(this.tempPosition);
    positions.generate();
    
    return positions.list.filter(p => p.diag[index] === 0).map(p => Tools.indexes.filter((c, i) => (p.diag[c] !== this.tempPosition.diag[c]) && i !== index && p.diag[c] === this.selectedPiece)[0]);  
  }
  
  mousedownCase(event: MouseEvent, index: number) {
    event.preventDefault();
    
    let positions = new Positions(this.position);
    positions.generate();
    console.log(positions.list.filter(p => p.diag[index] === 0));
    if (this.isCasePlayable(positions, this._getRelativeIndex(index))) {        
        this.tempPosition = Position.getPosition(this.position);               
        this.selectedPiece = this.position.diag[this._getRelativeIndex(index)];       
        this.ghosts = this.getGhosts(this._getRelativeIndex(index));  
        this.selectedCase = this._getRelativeIndex(index);
        this.position.diag[this._getRelativeIndex(index)] = 0;       
        this.selectedTop = event.clientY - 37.5 + 'px';
        this.selectedLeft = event.clientX  - 37.5 + 'px';                 
    }
  }
  
  mouseupCase(event: MouseEvent, index: number) {    
    event.preventDefault();
    
    if (index === this.selectedCase) {
        this.position = Position.getPosition(this.tempPosition);
        this.ghosts = [];
        this.selectedPiece = 0;
        this.selectedCase = -1;
    } else {    
        if (this.selectedPiece !== 0) {
            this.position.diag[this._getRelativeIndex(index)] = this.selectedPiece;

            let positions = new Positions(this.tempPosition);
            positions.generate();

            let aMoves = positions.list.filter((p) => p.diag[index] === this.position.diag[index] && p.diag[this.selectedCase] === this.position.diag[this.selectedCase]);                 

            if (aMoves.length === 1) {
                this.position = aMoves[0];
            } else {            
                this.position = Position.getPosition(this.tempPosition);                                 
            }

            this.ghosts = [];
            this.selectedPiece = 0;
            this.selectedCase = -1;
        }     
    }   
  }
  
  mousemoveCase(event: MouseEvent) {
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
        this.position = Position.getPosition(this.tempPosition);
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
