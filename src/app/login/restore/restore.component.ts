import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService, SessionService } from '../../_services/index';
import { User } from '../../_models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-restore',
  templateUrl: './restore.component.html'
})
export class LoginRestoreComponent implements OnInit {
  model: any = {};
  loading = false;
  errors: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private session: SessionService
  ) { }

  ngOnInit() {
  }

  restore(ngForm: NgForm) {
    if (!ngForm.form.valid) {
      console.log('invalid', ngForm.form.valid)
      return
    }
    this.loading = true;
    this.auth.restorePassword(this.model.email)
        .subscribe(
          data => {
            this.router.navigate(['..']);
          },
          error => {
            this.errors = error;
            ngForm.form.markAsUntouched();
            this.loading = false;
          })
  }
}
