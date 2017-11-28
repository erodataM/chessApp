import { Position } from './Position';

export class Game {
    currentPosition: Position;
    list: Position[];
    constructor(position: Position) { 
        this.currentPosition = position;
        this.list = new Array();
        this.list.push(position);
    }  
}