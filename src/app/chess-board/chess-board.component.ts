import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Chessboard } from '../model/Chessboard';
import { Piece } from '../model/Piece';
import { Tools } from '../model/Tools';
import { Position } from '../model/Position';
import { Positions } from '../model/Positions';
import { Game } from '../model/Game';  

import { PromoteDialogComponent } from '../promote-dialog/promote-dialog.component';

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
  
  @Input() game: Game;
  
  constructor(public promoteDialog: MatDialog) {}
  
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
  
  openPromoteDialog(index, selectedCase): void {
    let dialogRef = this.promoteDialog.open(PromoteDialogComponent, {
      width: '375px',
      height: '125px',     
      data: { 
        piece: this.piece.Title,
        couleur: this.position.trait ? 'b' : 'n',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.position.diag[index] = result;
        
        let positions = new Positions(this.tempPosition);
        positions.generate();      
        
        this.position = positions.list.filter(p => p.diag[selectedCase] === 0 && p.diag[index] === result)[0];
        this.position.calcMove(this.tempPosition);
        this.game.list.push(this.position);             
    });
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
    
    return positions.list.filter(
        p => p.diag[index] === 0
    ).map(
        p => Tools.indexes.filter(
            (c, i) => (p.diag[c] !== this.tempPosition.diag[c]) && i !== index && p.diag[c] === this.selectedPiece
        )[0]
    );  
    
  }
  
  mousedownCase(event: MouseEvent, index: number) {
    event.preventDefault();
    
    let positions = new Positions(this.position);
    positions.generate();
    
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
    if (this.selectedPiece !== 0) {
        if (index === this.selectedCase) {
            this.position = Position.getPosition(this.tempPosition);
            
            this.ghosts = [];
            this.selectedPiece = 0;
            this.selectedCase = -1;
        } else {    
            this.position.diag[this._getRelativeIndex(index)] = this.selectedPiece;

            let positions = new Positions(this.tempPosition);
            positions.generate();
                                                               
            let aMoves = positions.list.filter(p => 
                p.diag[this._getRelativeIndex(index)] === this.position.diag[this._getRelativeIndex(index)] 
             && p.diag[this.selectedCase] === this.position.diag[this.selectedCase]
            );
            
            if (aMoves.length === 1) {
                this.position = aMoves[0];
                this.position.calcMove(this.tempPosition);
                this.game.list.push(this.position);
            } else {
                let a = positions.list.filter(p => p.diag[this.selectedCase] === 0 && (p.move_type === 'PROMOTION' || p.move_type === 'PROMOTION_TAKE')); 
                if (a.length > 0) {
                    this.openPromoteDialog(this._getRelativeIndex(index), this.selectedCase);
                } else {
                    this.position = Position.getPosition(this.tempPosition);
                }                               
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
