import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'border-tips',
  templateUrl: './tips.component.html',
  styles: [`
    :host {
      z-index: 1;
      position: relative;
    }
  `]
})
export class BorderTipsComponent implements OnInit {
  @Input() step: number = 1;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
