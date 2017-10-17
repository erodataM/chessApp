import { Tools } from './Tools';
import { Position } from './Position';

export class Positions {
    base: Position;
    list: Position[];
    
    constructor(base:Position) {
        this.base = new Position(base.diag, base.trait, base.roi, base.pr, base.gr, base.pep);
        this.list = new Array();
    }
    
    generate() {
        let s, t, i, n, pion, cav, fou, tour, roi;
        this.list = new Array();
		
        if (this.base.trait) {
            s = 1;
            t = 0;
        } else {
            s = -1;
            t = 1;
        }
        
        for (i = 0; i < 64; i++) {
            if (this.base.diag[i] === s) {
                if (this.base.diag[i - s * 8] === 0) {
                    this.list.push(this.getPosition(this.base)); 
                    this.list[this.list.length - 1].diag[i] = 0;                   
                    this.list[this.list.length - 1].diag[i - s * 8] = s;
                    
                    if (!this.list[this.list.length - 1].isInCheck()) {
                        this.list[this.list.length - 1].trait = !this.list[this.list.length - 1].trait;
                        this.list[this.list.length - 1].pep = -1;
                        if ((i > 7 && i < 16 && s === 1) || (i > 47 && i < 56 && s === -1)) {
                            this.list[this.list.length - 1].diag[i - s * 8] = 2 * s;
                            this.list.push(this.getPosition(this.list[this.list.length - 1]));                                 
                            this.list[this.list.length - 1].diag[i - s * 8] = 3 * s;
                            this.list.push(this.getPosition(this.list[this.list.length - 1]));
                            this.list[this.list.length - 1].diag[i - s * 8] = 4 * s;
                            this.list.push(this.getPosition(this.list[this.list.length - 1]));
                            this.list[this.list.length - 1].diag[i - s * 8] = 5 * s;                            
                        }                        
                    } else {
                        this.list.pop();
                    }
                    
                    if ((i > 47 && i < 56 && s === 1) || (i > 7 && i <16 && s === -1)) {
                        if (this.base.diag[i - s * 16] === 0) {
                            this.list.push(this.getPosition(this.base));
                            this.list[this.list.length - 1].diag[i] = 0;
                            this.list[this.list.length - 1].diag[i - s * 16] = s;
                            if (!this.list[this.list.length - 1].isInCheck()) {
                                this.list[this.list.length - 1].trait = !this.list[this.list.length - 1].trait;
                                this.list[this.list.length - 1].pep = i - s * 8;                                
                            } else {
                                this.list.pop();
                            }
                        }
                    }
                }
                                              
                for (pion in Tools.tabPion) {
                    if (Tools.isIn120(i, -s * Tools.tabPion[pion][0])) {
                        if (this.base.diag[i - s * Tools.tabPion[pion][1]] * s < 0) {                        
                            this.list.push(this.getPosition(this.base));
                            this.list[this.list.length - 1].diag[i] = 0;
                            this.list[this.list.length - 1].diag[i - s * Tools.tabPion[pion][1]] = s;
                            if (!this.list[this.list.length - 1].isInCheck()) {                        
                                this.list[this.list.length - 1].trait = !this.list[this.list.length - 1].trait;
                                this.list[this.list.length - 1].pep = -1;							
                                if ((i > 7 && i < 16 && s === 1) || (i > 47 && i < 56 && s === -1)) {
                                    this.list[this.list.length - 1].diag[i - s * Tools.tabPion[pion][1]] = 2 * s;
                                    this.list.push(this.getPosition(this.list[this.list.length - 1]));                                 
                                    this.list[this.list.length - 1].diag[i - s * Tools.tabPion[pion][1]] = 3 * s;
                                    this.list.push(this.getPosition(this.list[this.list.length - 1]));
                                    this.list[this.list.length - 1].diag[i - s * Tools.tabPion[pion][1]] = 4 * s;
                                    this.list.push(this.getPosition(this.list[this.list.length - 1]));
                                    this.list[this.list.length - 1].diag[i - s * Tools.tabPion[pion][1]] = 5 * s;                                 
                                }                            
                            } else {
                                this.list.pop();
                            }
                        }
                        
                        if (this.base.pep === i - s * Tools.tabPion[pion][1]) {
                            this.list.push(this.getPosition(this.base));
                            this.list[this.list.length - 1].diag[i] = 0;
                            this.list[this.list.length - 1].diag[i - s * Tools.tabPion[pion][1]] = s;
                            this.list[this.list.length - 1].diag[i - s * Tools.tabPion[pion][2]] = 0;
                            if (!this.list[this.list.length - 1].isInCheck()) {
                                this.list[this.list.length - 1].trait = !this.list[this.list.length - 1].trait;
                                this.list[this.list.length - 1].pep = -1;                            
                            } else {
                                this.list.pop();
                            }
                        }                    
                    }
                }                                				
            }	
            
            if (this.base.diag[i] === 2 * s) {                               
                for (cav in Tools.tabCav) {
                    if (Tools.isIn120(i, Tools.tabCav[cav][0])) {
                        if (this.base.diag[i + Tools.tabCav[cav][1]] * s <= 0) {
                            this.list.push(this.getPosition(this.base));
                            this.list[this.list.length - 1].diag[i] = 0;
                            this.list[this.list.length - 1].diag[i + Tools.tabCav[cav][1]] = 2 * s;
                            if (!this.list[this.list.length - 1].isInCheck()) {
                                this.list[this.list.length - 1].trait = !this.list[this.list.length - 1].trait;
                                this.list[this.list.length - 1].pep = -1;                            
                            } else {
                                this.list.pop();
                            }
                        }
                    }
                }
            }
            
            if (this.base.diag[i] === 3 * s || this.base.diag[i] === 5 * s) {                
                for (fou in Tools.tabFou) {
                    for (n = 1; Tools.isIn120(i, n * Tools.tabFou[fou][0]); n++) {
                        if(this.base.diag[i + n * Tools.tabFou[fou][1]] * s <= 0) {
                            this.list.push(this.getPosition(this.base));
                            this.list[this.list.length - 1].diag[i] = 0;
                            this.list[this.list.length - 1].diag[i + n * Tools.tabFou[fou][1]] = this.base.diag[i];
                            if (!this.list[this.list.length - 1].isInCheck()) {
                                this.list[this.list.length - 1].trait = !this.list[this.list.length - 1].trait;
                                this.list[this.list.length - 1].pep = -1;                            
                            } else {
                                this.list.pop();
                            }
                            if (this.base.diag[i + n * Tools.tabFou[fou][0]] * s < 0) {
                                break;
                            }                             
                        } else {
                            break;
                        }
                    }
                }
            }	
            
            if (this.base.diag[i] === 4 * s || this.base.diag[i] === 5 * s) {                
                for (tour in Tools.tabTour) {
                    for (n = 1; Tools.isIn120(i, n * Tools.tabTour[tour][0]); n++) {
                        if (this.base.diag[i + n * Tools.tabTour[tour][1]] * s <= 0) {
                            this.list.push(this.getPosition(this.base));
                            this.list[this.list.length - 1].diag[i] = 0;
                            this.list[this.list.length - 1].diag[i + n * Tools.tabTour[tour][1]] = this.base.diag[i];
                            if (!this.list[this.list.length - 1].isInCheck()) {
                                this.list[this.list.length - 1].trait = !this.list[this.list.length - 1].trait;
                                this.list[this.list.length - 1].pep = -1;    
                                if (this.base.diag[i] === 4 * s && i === 63 && s === 1) {
                                    this.list[this.list.length - 1].pr[0] = false;
                                }
                                if (this.base.diag[i] === 4 * s && i === 7 && s === -1) {
                                    this.list[this.list.length - 1].pr[1] = false;
                                }
                                if (this.base.diag[i] === 4 * s && i === 56 && s === 1) {
                                    this.list[this.list.length - 1].gr[0] = false;
                                }
                                if (this.base.diag[i] === 4 * s && i === 0 && s === -1) {
                                    this.list[this.list.length - 1].gr[1] = false;
                                }                                                        
                            } else {
                                this.list.pop();
                            }
                            if(this.base.diag[i + n * Tools.tabTour[tour][1]] * s < 0) {
                                break;
                            }
                        } else {
                            break;
                        }
                    }
                }
            }
            
            if (this.base.diag[i] === 6 * s) {                
                for (roi in Tools.tabRoi) {
                    if (Tools.isIn120(i, Tools.tabRoi[roi][0]) && this.base.diag[i + Tools.tabRoi[roi][1]] * s <= 0) {                        
                        this.list.push(this.getPosition(this.base));
                        this.list[this.list.length - 1].diag[i] = 0;
                        this.list[this.list.length - 1].diag[i + Tools.tabRoi[roi][1]] = s * 6;
                        this.list[this.list.length - 1].roi[t] = i + Tools.tabRoi[roi][1];
                        if (!this.list[this.list.length - 1].isInCheck()) {
                            this.list[this.list.length - 1].trait = !this.list[this.list.length - 1].trait;
                            this.list[this.list.length - 1].pep = -1;  
                            this.list[this.list.length - 1].pr[t] = false;
                            this.list[this.list.length - 1].gr[t] = false;
                        } else {
                            this.list.pop();
                        }
                    }
                }
                
                if (this.base.trait && this.base.pr[0] && this.base.diag[63] === 4 && this.base.diag[62] === 0 && this.base.diag[61] === 0 && !this.base.isInCheck()) {
                    this.list.push(this.getPosition(this.base));
                    this.list[this.list.length - 1].diag[60] = 0;
                    this.list[this.list.length - 1].diag[61] = 6;
                    this.list[this.list.length - 1].roi[0] = 61;
                    if (!this.list[this.list.length - 1].isInCheck()) {
                        this.list[this.list.length - 1].diag[61] = 0;
                        this.list[this.list.length - 1].diag[62] = 6;
                        this.list[this.list.length - 1].roi[0] = 62;
                        if (!this.list[this.list.length - 1].isInCheck()) {
                            this.list[this.list.length - 1].diag[61] = 4;
                            this.list[this.list.length - 1].diag[63] = 0;
                            this.list[this.list.length - 1].pr[0] = false;
                            this.list[this.list.length - 1].gr[0] = false;
                            this.list[this.list.length - 1].trait = !this.list[this.list.length - 1].trait;
                            this.list[this.list.length - 1].pep = -1;                            
                        } else {
                            this.list.pop();
                        }
                    } else {
                        this.list.pop();
                    }
                }
                
                if (!this.base.trait && this.base.pr[1] && this.base.diag[7] === -4 && this.base.diag[6] === 0 && this.base.diag[5] === 0 && !this.base.isInCheck()) {                
                    this.list.push(this.getPosition(this.base));
                    this.list[this.list.length - 1].diag[4] = 0;
                    this.list[this.list.length - 1].diag[5] = -6;
                    this.list[this.list.length - 1].roi[1] = 5;
                    if (!this.list[this.list.length - 1].isInCheck()) {
                        this.list[this.list.length - 1].diag[5] = 0;
                        this.list[this.list.length - 1].diag[6] = -6;
                        this.list[this.list.length - 1].roi[1] = 6;
                        if (!this.list[this.list.length - 1].isInCheck()) {
                            this.list[this.list.length - 1].diag[5] = -4;
                            this.list[this.list.length - 1].diag[7] = 0;
                            this.list[this.list.length - 1].pr[1] = false;
                            this.list[this.list.length - 1].gr[1] = false;
                            this.list[this.list.length - 1].trait = !this.list[this.list.length - 1].trait;
                            this.list[this.list.length - 1].pep = -1;                            
                        } else {
                            this.list.pop();
                        }
                    } else {
                        this.list.pop();
                    }
                }
                
                if (this.base.trait && this.base.gr[0] && this.base.diag[56] === 4 && this.base.diag[57] === 0 && this.base.diag[58] === 0 && this.base.diag[59] === 0 && !this.base.isInCheck()) {
                    this.list.push(this.getPosition(this.base));
                    this.list[this.list.length - 1].diag[60] = 0;
                    this.list[this.list.length - 1].diag[59] = 6;
                    this.list[this.list.length - 1].roi[0] = 59;
                    if (!this.list[this.list.length - 1].isInCheck()) {
                        this.list[this.list.length - 1].diag[59] = 0;
                        this.list[this.list.length - 1].diag[58] = 6;
                        this.list[this.list.length - 1].roi[0] = 58;
                        if (!this.list[this.list.length - 1].isInCheck()) {
                            this.list[this.list.length - 1].diag[59] = 4;
                            this.list[this.list.length - 1].diag[56] = 0;
                            this.list[this.list.length - 1].pr[0] = false;
                            this.list[this.list.length - 1].gr[0] = false;
                            this.list[this.list.length - 1].trait = !this.list[this.list.length - 1].trait;
                            this.list[this.list.length - 1].pep = -1;                            
                        } else {
                            this.list.pop();
                        }
                    } else {
                        this.list.pop();
                    }
                }
                
                if (!this.base.trait && this.base.gr[1] && this.base.diag[0] === -4 && this.base.diag[1] === 0 && this.base.diag[2] === 0 && this.base.diag[3] === 0 && !this.base.isInCheck()) {
                    this.list.push(this.getPosition(this.base));
                    this.list[this.list.length - 1].diag[4] = 0;
                    this.list[this.list.length - 1].diag[3] = -6;
                    this.list[this.list.length - 1].roi[1] = 3;
                    if (!this.list[this.list.length - 1].isInCheck()) {
                        this.list[this.list.length - 1].diag[3] = 0;
                        this.list[this.list.length - 1].diag[2] = -6;
                        this.list[this.list.length - 1].roi[1] = 2;
                        if (!this.list[this.list.length - 1].isInCheck()) {
                            this.list[this.list.length - 1].diag[3] = -4;
                            this.list[this.list.length - 1].diag[0] = 0;
                            this.list[this.list.length - 1].pr[1] = false;
                            this.list[this.list.length - 1].gr[1] = false;
                            this.list[this.list.length - 1].trait = !this.list[this.list.length - 1].trait;
                            this.list[this.list.length - 1].pep = -1;                           
                        } else {
                            this.list.pop();
                        }
                    } else {
                        this.list.pop();
                    }
                }
            }
        }
    }
    
    getPosition(position: Position): Position {
        return new Position(position.diag, position.trait, position.roi, position.pr, position.gr, position.pep);
    }
}