import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SessionService } from '../../_services/session.service';

@Component({
  selector: 'app-border',
  templateUrl: './border.component.html',
  styles: []
})
export class BorderComponent implements OnInit {
  isTipsShown: boolean = false;
  tipStep: number = 0;
  public modeSharedData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService
  ) {
    this.modeSharedData = this.session.get_tmp('sign-up/draw/modeSharedData');
    if (this.modeSharedData == null) {
      this.modeSharedData = {};
      this.session.save_tmp('sign-up/draw/modeSharedData', this.modeSharedData);
    }
  }

  ngOnInit() {
    this.route.queryParams
        .subscribe((params: Params) => {
          this.isTipsShown = params['tips'] != null;
          this.tipStep = parseInt(params['tips']) || 1;
        })
  }

  toggleTips() {
    if (this.isTipsShown) {
      this.router.navigate([], { queryParams: null })
    } else {
      this.router.navigate([], { queryParams: {tips: 1} })
    }
  }
}
