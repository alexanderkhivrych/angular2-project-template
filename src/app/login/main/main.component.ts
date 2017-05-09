import { Component, OnInit, Input, EventEmitter, Output,
         trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import {
  AuthService, AccountService, SessionService
} from '../../_services/index';
import { UserInterface } from '../../_models/user';

@Component({
  selector: 'app-login-main',
  templateUrl: './main.component.html',
  styles: [`
    .field_item {
      overflow: hidden;
      display: inline-block;
    }
  `],
  animations: [
    trigger('shrinkOutEmail', [
      state('restore', style({opacity: 0, height: 0, overflow: 'hidden'})),
      transition('default => restore', [
        animate(200, keyframes([
          style({
            height: '*',
            opacity: 1,
            offset: 0.0
          }),
          style({
            height: '0',
            margin: '0 0 * 0',
            opacity: 0,
            offset: 0.75
          }),
          style({
            height: '0',
            margin: '0 0 0 0',
            opacity: 0,
            offset: 1
          })
        ]))
      ]),
      transition(':enter', [
        style({height: '0'}),
        animate(200, style({height: '*'}))
      ]),
    ])
  ]
})
export class LoginMainComponent implements OnInit {
  @Input() state: string = null;
  model: any = {};
  errors: any = null;
  loading = false;

  @Output() onAnimationFinished = new EventEmitter<boolean>();
  animationFinished(evt) {
    this.onAnimationFinished.emit(true);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private account: AccountService,
    private auth: AuthService,
    private session: SessionService
  ) { }

  ngOnInit() {
  }

  fetchProfileAndRedirect() {
    if (this.session.isUserSignedIn()) {
      // this.router.navigate(['./cabinet'], { relativeTo: this.route });
      //
    }
  }

  login(ngForm: NgForm) {
    if (!ngForm.form.valid) {
      // console.log('invalid', ngForm.form.valid);
      return;
    }
    this.loading = true;
    this.errors = null;
    console.log('submitted', this.model);
    const credentials: UserInterface = {
      email: this.model.email,
      password: this.model.password
    };
    this.auth
        .login(credentials)
        .subscribe(
          data => {
            this.account.redirectToCurrentState(true);
          },
          error => {
            this.errors = error;
            ngForm.form.markAsUntouched();
            this.loading = false;
          });
  }
}
