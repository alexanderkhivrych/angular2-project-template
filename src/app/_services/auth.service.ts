import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ApiRequestService } from './api-request.service';
import { SessionService } from './session.service';
import { User, UserInterface } from '../_models/index';

@Injectable()
export class AuthService {

  constructor(
    private api: ApiRequestService,
    private session: SessionService
  ) { }

  info() {
    return this.api.get('account/me');
  }

  full() {
    return this.api.get('account/me/full');
  }

  create(user: UserInterface) {
    return this.api.post('account/signup', JSON.stringify({
      email: user.email,
      password: user.password
    })).map((data) => {
      // login successful if there's a token in the response
      if (data && data.token) {
        // store user details and token in session
        user.token = data.token;
        this.session.sign_in(new User(user));
        return user;
      }
      return null;
    });
  }

  restorePassword(email: string) {
    return this.api.post('account/password/reset', JSON.stringify({ email: email }));
  }

  login(user: UserInterface) {
    return this.api.post('account/login', JSON.stringify({
      email: user.email,
      password: user.password
    })).map((data) => {
      // login successful if there's a token in the response
      if (data && data.token) {
        // store user details and token in session
        user.token = data.token;
        this.session.sign_in(new User(user));
        return user;
      }
      return null;
    });
  }

  logout() {
    return this.api.get('account/logout')
               .map((data) => {
                 // remove user from local storage to log user out
                 this.session.sign_out();
                 return data;
               });
  }
}
