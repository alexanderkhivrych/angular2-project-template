import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Router,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import {
  AuthService, SessionService, AccountService
} from '../_services/index';

import { User } from '../_models/user';

@Injectable()
export class SignUpGuardService implements CanLoad, CanActivate  {

  constructor(
    private session: SessionService,
    private account: AccountService,
    private router: Router
  ) { }

  private isRegistrationPending(): boolean {
    return (!this.session.isUserSignedIn() || this.session.current_user.confirmed == false);
  }

  canLoad(route: Route): boolean {
    return this.isRegistrationPending();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // let url: string = state.url;
    return this.isRegistrationPending();
  }
}
