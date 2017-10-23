import { Position } from './Position';
import { Positions } from './Positions';

// https://chessprogramming.wikispaces.com/Perft+Results
describe('Positions', () => {             
    it("generate 1", function() {    
        let position = Position.getPositionFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -');
        Positions.moves = 0;
        Positions.takes = 0;
        Positions.promotes = 0;
        Positions.eps = 0;
        Positions.castles = 0;
        Positions.perft(1, position)      
        expect(Positions.moves).toBe(20);
        expect(Positions.takes).toBe(0);
        expect(Positions.promotes).toBe(0);
        expect(Positions.eps).toBe(0);
        expect(Positions.castles).toBe(0);
    });
    
    it("generate 2", function() {    
        let position = Position.getPositionFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -');
        Positions.moves = 0;
        Positions.takes = 0;
        Positions.promotes = 0;
        Positions.eps = 0;
        Positions.castles = 0;
        Positions.perft(2, position)      
        expect(Positions.moves).toBe(400);
        expect(Positions.takes).toBe(0);
        expect(Positions.promotes).toBe(0);
        expect(Positions.eps).toBe(0);
        expect(Positions.castles).toBe(0);
    });
    
    it("generate 3", function() {    
        let position = Position.getPositionFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -');
        Positions.moves = 0;
        Positions.takes = 0;
        Positions.promotes = 0;
        Positions.eps = 0;
        Positions.castles = 0;
        Positions.perft(3, position)      
        expect(Positions.moves).toBe(8902);
        expect(Positions.takes).toBe(34);
        expect(Positions.promotes).toBe(0);
        expect(Positions.eps).toBe(0);
        expect(Positions.castles).toBe(0);
    });
    
    it("generate 4", function() {    
        let position = Position.getPositionFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -');
        Positions.moves = 0;
        Positions.takes = 0;
        Positions.promotes = 0;
        Positions.eps = 0;
        Positions.castles = 0;
        Positions.perft(4, position)      
        expect(Positions.moves).toBe(197281);
        expect(Positions.takes).toBe(1576);
        expect(Positions.promotes).toBe(0);
        expect(Positions.eps).toBe(0);
        expect(Positions.castles).toBe(0);
    });
    
    it("generate 5", function() {            
        let position = Position.getPositionFromFen('r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -');        
        Positions.moves = 0;
        Positions.takes = 0;
        Positions.promotes = 0;
        Positions.eps = 0;
        Positions.castles = 0;
        Positions.perft(1, position);      
        expect(Positions.moves).toBe(48);
        expect(Positions.takes).toBe(8);
        expect(Positions.promotes).toBe(0);
        expect(Positions.eps).toBe(0);
        expect(Positions.castles).toBe(2);
    });
    
    it("generate 6", function() {    
        let position = Position.getPositionFromFen('r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -'); 
        Positions.moves = 0;
        Positions.takes = 0;
        Positions.promotes = 0;
        Positions.eps = 0;
        Positions.castles = 0;
        Positions.perft(2, position);                
        expect(Positions.moves).toBe(2039);
        expect(Positions.takes).toBe(351);
        expect(Positions.promotes).toBe(0);
        expect(Positions.eps).toBe(1);
        expect(Positions.castles).toBe(91);
    });
    
    it("generate 7", function() {    
        let position = Position.getPositionFromFen('r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -');
        Positions.moves = 0;
        Positions.takes = 0;
        Positions.promotes = 0;
        Positions.eps = 0;
        Positions.castles = 0;
        Positions.perft(3, position);
        expect(Positions.moves).toBe(97862);
        expect(Positions.takes).toBe(17102);
        expect(Positions.promotes).toBe(0);
        expect(Positions.eps).toBe(45);
        expect(Positions.castles).toBe(3162);               
    });
    
    it("generate 8", function() {         
        let position = Position.getPositionFromFen('r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -');
        Positions.moves = 0;
        Positions.takes = 0;
        Positions.promotes = 0;
        Positions.eps = 0;
        Positions.castles = 0;
        Positions.perft(4, position);
        expect(Positions.moves).toBe(4085603);
        expect(Positions.takes).toBe(757163);
        expect(Positions.promotes).toBe(15172);
        expect(Positions.eps).toBe(1929);
        expect(Positions.castles).toBe(128013);        
    });  
    /*
    it("generate 8", function() {    
        let position = Position.getPositionFromFen('8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w ----');        
        expect(Positions.perft(1, position)).toBe(14);
    });
    
    it("generate 9", function() {    
        let position = Position.getPositionFromFen('8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w ----');        
        expect(Positions.perft(2, position)).toBe(191);
    });
    
    it("generate 10", function() {    
        let position = Position.getPositionFromFen('8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w ----');        
        expect(Positions.perft(3, position)).toBe(2812);
    });
    
    it("generate 11", function() {    
        let position = Position.getPositionFromFen('8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w ----');        
        expect(Positions.perft(4, position)).toBe(43238);
    });
    
    it("generate 12", function() {    
        let position = Position.getPositionFromFen('8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w ----');        
        expect(Positions.perft(5, position)).toBe(674624);
    });
    */
    it("generate 13", function() {    
        let position = Position.getPositionFromFen('r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w --kq');
        Positions.moves = 0;
        Positions.takes = 0;
        Positions.promotes = 0;
        Positions.eps = 0;
        Positions.castles = 0;
        Positions.perft(1, position);  
        expect(Positions.moves).toBe(6);
        expect(Positions.takes).toBe(0);
        expect(Positions.promotes).toBe(0);
        expect(Positions.eps).toBe(0);
        expect(Positions.castles).toBe(0);
    });
    it("generate 14", function() {    
        let position = Position.getPositionFromFen('r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w --kq');
        Positions.moves = 0;
        Positions.takes = 0;
        Positions.promotes = 0;
        Positions.eps = 0;
        Positions.castles = 0;
        Positions.perft(2, position);  
        expect(Positions.moves).toBe(264);
        expect(Positions.takes).toBe(87);
        expect(Positions.promotes).toBe(48);
        expect(Positions.eps).toBe(0);
        expect(Positions.castles).toBe(6);
    });
    it("generate 15", function() {    
        let position = Position.getPositionFromFen('r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w --kq');
        Positions.moves = 0;
        Positions.takes = 0;
        Positions.promotes = 0;
        Positions.eps = 0;
        Positions.castles = 0;
        Positions.perft(3, position);  
        expect(Positions.moves).toBe(9467);
        expect(Positions.takes).toBe(1021);
        expect(Positions.promotes).toBe(120);
        expect(Positions.eps).toBe(4);
        expect(Positions.castles).toBe(0);
    });    
});
