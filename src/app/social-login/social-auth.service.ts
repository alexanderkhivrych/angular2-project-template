import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiRequestService } from '../_services/api-request.service';
import { SessionService } from '../_services/session.service';

declare let VK: any;
declare let FB: any;

export interface IProvider {
  clientId: string;
  apiVersion?: string;
}

export interface IProviders {
  [provider: string]: IProvider;
}

@Injectable()
export class SocialAuthService {

  constructor(
    private api: ApiRequestService,
    private session: SessionService
  ) { }

  getToken(provider: string): Observable<String> {
    return Observable.create(
             (observer) => {
               switch(provider){
                 case 'facebook':
                   FB.login((response) => {
                     if (response.status == 'connected' && response.authResponse) {
                       let token = response.authResponse.accessToken;

                       observer.next(token);
                       observer.complete();
                     }
                   });

                   break;

                 case 'vkontakte':
                   VK.Auth.login(function(response) {
                     if (response.status == 'connected' && response.session) {
                       let token = response.session.sid

                       observer.next(token);
                       observer.complete();
                     }
                   });

                   break;
               }
             }
    )
  }

  socialLogin(provider: string) {
    this.getToken(provider).subscribe((token) => {
      this.api.post('account/social', JSON.stringify({
        provider: provider,
        access_token: token
      }))
      .map((response: Response) => {
        let data = response.json();

        // TODO(Store user to session or return error)
      });
    })

    // TODO
  }
}
