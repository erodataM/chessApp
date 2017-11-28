import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { MenuComponent } from './menu/menu.component';

import {MatButtonModule, MatCardModule, MatCheckboxModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule} from '@angular/material';
import { PromoteDialogComponent } from './promote-dialog/promote-dialog.component';
import { NotationComponent } from './notation/notation.component';

@NgModule({
  declarations: [
    AppComponent,
    ChessBoardComponent,
    MenuComponent,
    PromoteDialogComponent,
    NotationComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PromoteDialogComponent]
})
export class AppModule { }
