import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { SessionService } from './session.service';
import { User, UserInterface } from '../_models/index';
import { Observable } from 'rxjs/Observable';

import { Router, ActivatedRoute } from '@angular/router';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';

@Injectable()
export class AccountService {

  constructor(
    private router: Router,
    private locale: LocaleService,
    private api: ApiRequestService,
    private session: SessionService
  ) { }

  private getCached<T>(request_path: string, cache_key: string, cached = true) {
    return new Observable<T>(observer => {
      let cached_data: T;
      if (cached && (cached_data = this.session.get<T>(cache_key)) != null) {
        observer.next(cached_data);
        observer.complete();
      } else {
        this.api.get<any>(request_path).subscribe(
          data => {
            this.session.save(cache_key, data);
            observer.next(data);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
      }
    });
  }

  public current(cached = true) {
    return this.getCached('account/me', 'currentAccount', cached);
  }

  public full(cached = true) {
    return this.getCached<any>('account/me/full', 'fullAccount', cached);
  }

  public update(data: any = {}) {
    return this.api.put('account/me', JSON.stringify(data));
  }

  public saveCurrentPath() {
    this.session.save('accountSavedPath', this.router.url);
  }

  private redirectUnlessCurrent(path) {
    if (this.router.url !== path) {
      console.log('redirect to', path);
      this.router.navigateByUrl(path);
    }
  }

  public dashboardPath() {
    return `/${this.locale.getDefaultLocale()}/cabinet`;
  }

  public redirectToCurrentState(forced = false) {
    let saved_path = this.session.get<string>('accountSavedPath');
    if (forced || saved_path == null) {
      if (this.session.isUserSignedIn()) {
        this.current(!forced).subscribe(
          (user: UserInterface) => {
            if (user.location == null || user.house == null) {
              // location setup required
              saved_path = `/${this.locale.getDefaultLocale()}/sign-up/address`;
            } else if (user.neighborhood == null) {
              saved_path = `/${this.locale.getDefaultLocale()}/sign-up/border`;
            } else if (!user.full_name || (user.first_name === '' && user.last_name === '')) {
              saved_path = `/${this.locale.getDefaultLocale()}/sign-up/account`;
            } else {
              saved_path = this.dashboardPath();
            }
            this.session.save('accountSavedPath', saved_path);
            this.redirectUnlessCurrent(saved_path);
          }, error => { saved_path = '/'; }
        );
        return;
      } else {
        saved_path = '/';
        this.session.save('accountSavedPath', saved_path);
      }
    }
    this.redirectUnlessCurrent(saved_path);
  }
}
