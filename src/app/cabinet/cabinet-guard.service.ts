import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Router,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { SessionService } from '../_services/session.service';

@Injectable()
export class CabinetGuardService {

  constructor(
    private session: SessionService,
    private router: Router
   ) { }

  canLoad(route: Route): boolean {
    return this.checkLogin();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  checkLogin() {
    if (this.session.isUserSignedIn()) { return true; }

    this.router.navigate(['/']);

    return false;
  }
}
