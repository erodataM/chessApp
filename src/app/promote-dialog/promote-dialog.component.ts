import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-promote-dialog',
  templateUrl: './promote-dialog.component.html',
  styleUrls: ['./promote-dialog.component.css']
})
export class PromoteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PromoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    ngOnInit() {
        
    }
    
    calcClassCav() {
        return 'case ' + this.data.piece + ' cav' + this.data.couleur; 
    }
    calcClassFou() {
        return 'case ' + this.data.piece + ' fou' + this.data.couleur; 
    }
    calcClassTou() {
        return 'case ' + this.data.piece + ' tou' + this.data.couleur; 
    }
    calcClassDam() {
        return 'case ' + this.data.piece + ' dam' + this.data.couleur; 
    }
    
    clickCav() {
        let s = this.data.couleur === 'b' ? 1 : -1;
        this.dialogRef.close(s * 2);
    }
    
    clickFou() {
        let s = this.data.couleur === 'b' ? 1 : -1;
        this.dialogRef.close(s * 3);
    }
    
    clickTou() {
        let s = this.data.couleur === 'b' ? 1 : -1;
        this.dialogRef.close(s * 4);
    }
    
    clickDam() {
        let s = this.data.couleur === 'b' ? 1 : -1;
        this.dialogRef.close(s * 5);
    }
}
