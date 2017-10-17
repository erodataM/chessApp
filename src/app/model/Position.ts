import { Tools } from './Tools';

export class Position {
    diag: number[];
    trait: boolean;
    roi: number[];
    pr: boolean[];
    gr: boolean[];
    pep: number;
    
    constructor(diag:number[], trait:boolean, roi: number[], pr: boolean[], gr: boolean[], pep:number) {
        let n;
	this.trait = trait;
	
        this.diag = new Array();
        for (n = 0; n < 64; n++) {
            this.diag[n] = diag[n];
	}
	
        this.roi = new Array();
	this.roi[0] = roi[0];
	this.roi[1] = roi[1];
        
	this.pr = new Array();
	this.pr[0] = pr[0];
	this.pr[1] = pr[1];
	
        this.gr = new Array();
	this.gr[0] = gr[0];
	this.gr[1] = gr[1];
	
        this.pep = pep;                        
    }
    
    isInCheck() {
        let a, s, t, roi;
        
        if (this.trait) {
            s = -1;
            t = 0;
        } else {
            s = 1;
            t = 1;
        }
        
        if ((Tools.isIn120(this.roi[t], s * 9) && this.diag[this.roi[t] + s * 7] === s)
         || (Tools.isIn120(this.roi[t], s * 11) && this.diag[this.roi[t] + s * 9] === s)
         || (Tools.isIn120(this.roi[t], 21) && this.diag[this.roi[t] + 17] === s * 2)
         || (Tools.isIn120(this.roi[t], -21) && this.diag[this.roi[t] - 17] === s * 2)
         || (Tools.isIn120(this.roi[t], 19) && this.diag[this.roi[t] + 15] === s * 2)
         || (Tools.isIn120(this.roi[t], -19) && this.diag[this.roi[t] - 15] === s * 2)
         || (Tools.isIn120(this.roi[t], 12) && this.diag[this.roi[t] + 10] === s * 2)
         || (Tools.isIn120(this.roi[t], -12) && this.diag[this.roi[t] - 10] === s * 2)
         || (Tools.isIn120(this.roi[t], 8) && this.diag[this.roi[t] + 6] === s * 2)
         || (Tools.isIn120(this.roi[t], -8) && this.diag[this.roi[t] - 6] === s * 2)         
            ) {
            return true;            
        }
                        
        for (roi in Tools.tabRoi) {
            for (a = 1; Tools.isIn120(this.roi[t], Tools.tabRoi[roi][0] * a); a++) {
                if (this.diag[this.roi[t] + Tools.tabRoi[roi][1] * a] !== 0) {
                    if (this.diag[this.roi[t] + Tools.tabRoi[roi][1] * a] === s * 3
                      ||this.diag[this.roi[t] + Tools.tabRoi[roi][1] * a] === s * 5
                      ||(a === 1 && this.diag[this.roi[t] + Tools.tabRoi[roi][1]] === s * 6)
                    ) {
                        return true;
                    } else {
                        break;
                    }
                }                   
            }
        }                
        
        return false;          
    }
}