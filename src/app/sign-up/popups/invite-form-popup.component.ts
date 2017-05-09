import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

export const INVITE_FORM_POPUP_FRAGMENT = 'by_invite';

@Component({
  selector: 'app-invite-form-popup',
  templateUrl: './invite-form-popup.component.html'
})
export class InviteFormPopupComponent implements OnInit {
  public isShown = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  close(evt) {
    evt && evt.preventDefault();
    this.router.navigate(['./'], { fragment: null });
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.route.fragment.subscribe(fragment => {
      this.isShown = (fragment === INVITE_FORM_POPUP_FRAGMENT);
    });
  }
}
