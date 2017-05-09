import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-address-tips',
  templateUrl: './tips.component.html',
  styles: [`
    :host {
      z-index: 1;
      position: relative;
    }
  `]
})
export class TipsComponent implements OnInit {
  public step: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams
        .subscribe((params: Params) => {
          if (params['tips'] != null) {
            this.step = parseInt(params['tips']) || 1;
          } else { this.step = null }
        })
  }

}
