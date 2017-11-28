import { Component, OnInit, Input } from '@angular/core';
import { Position } from '../model/Position';

@Component({
  selector: 'app-notation',
  templateUrl: './notation.component.html',
  styleUrls: ['./notation.component.css']
})

export class NotationComponent implements OnInit {
  @Input() game: Position[];
  constructor() { }

  ngOnInit() {
  }

}
