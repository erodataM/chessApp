import { Position } from './Position';
import { Positions } from './Positions';

// https://chessprogramming.wikispaces.com/Perft+Results
describe('Positions', () => {
    let testPosition = function(fen, depth, moves, takes, eps, castles, promotes) {
        it('(' + depth + ') fen : ' + fen, function() {  
            let position = Position.getPositionFromFen(fen);
            Positions.moves = 0;
            Positions.takes = 0;
            Positions.promotes = 0;
            Positions.eps = 0;
            Positions.castles = 0;
            
            Positions.perft(depth, position)      
            
            expect(Positions.moves).toBe(moves);
            if (takes != undefined) {
                expect(Positions.takes).toBe(takes);
            }
            if (promotes != undefined) {
                expect(Positions.promotes).toBe(promotes);
            }
            if (eps != undefined) {
                expect(Positions.eps).toBe(eps);
            }
            if (castles != undefined) {
                expect(Positions.castles).toBe(castles);
            }
        });
    };
    
    let testArray = [
        ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -', 1, 20, 0, 0, 0, 0],
        ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -', 2, 400, 0, 0, 0, 0],
        ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -', 3, 8902, 34, 0, 0, 0],
        ['r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -', 1, 48, 8, 0, 2, 0],
        ['r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -', 2, 2039, 351, 1, 91, 0],
        ['r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -', 3, 97862, 17102, 45, 3162, 0],
        ['r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -', 4, 4085603, 757163, 1929, 128013, 15172],
        ['8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w ----', 1, 14, 1, 0, 0, 0],
        ['8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w ----', 2, 191, 14, 0, 0, 0],
        ['8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w ----', 3, 2812, 209, 2, 0, 0],
        ['8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w ----', 4, 43238, 3348, 123, 0, 0],
        ['8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w ----', 5, 674624, 52051, 1165, 0, 0],
        ['r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w --kq', 1, 6, 0, 0, 0, 0],
        ['r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w --kq', 2, 264, 87, 0, 6, 48],
        ['r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w --kq', 3, 9467, 1021, 4, 0, 120],
        ['rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ--', 1, 44],
        ['rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ--', 2, 1486],
    ];      
    
    testArray.map(
        test => testPosition(test[0], test[1], test[2], test[3], test[4], test[5], test[6])
    );                
});
