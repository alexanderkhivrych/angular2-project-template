import { Component, OnInit, EventEmitter, Input, Output,
         trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService, AccountService } from '../_services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .login_form_content h2 + h2 {
      display: block;
      margin-top: -90px;
    }
  `],
  animations: [
    trigger('titleAnimation', [
      transition("* => active", animate(200, keyframes([
        style({opacity: 0, offset: 0}),
        style({opacity: 0.5, offset: 0.8}),
        style({opacity: 1, offset: 1})
      ]))),
      transition("active => *", animate(200, keyframes([
        style({opacity: 1, offset: 0}),
        style({opacity: 0.5, offset: 0.2}),
        style({opacity: 0, offset: 1})
      ])))
    ])
  ]
})
export class LoginComponent implements OnInit {
  model: any = {};
  readonly STATES = {
    DEFAULT: 'default',
    RESTORE: 'restore'
  };
  state: string = this.STATES.DEFAULT;
  pending: string = null;

  @Output() sharedLoginState = new EventEmitter<string>();

  constructor(
    private session: SessionService,
    private account: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.session.isUserSignedIn()) {
      this.account.redirectToCurrentState();
    }
  }

  getActivityState(state): string {
    return (state === this.state) ? 'active' : 'pending';
  }

  other(state): string {
    return (state === this.STATES.RESTORE) ? this.STATES.DEFAULT : this.STATES.RESTORE;
  }

  onAnimationFinished(evt) {
    if (this.pending) {
      [this.state, this.pending] = [this.pending, null];
    };
  }

  toggleRestorePassword() {
    if (this.pending) { return; }
    this.pending = (this.state === this.STATES.RESTORE) ? this.STATES.DEFAULT : this.STATES.RESTORE;
    if (this.pending === this.STATES.DEFAULT) {
      this.onAnimationFinished(this.STATES.DEFAULT);
    }
  }

  ngOnInit() {
    eval('window.ttt=this');
  }
}
