import { Injectable } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../_models/user';

@Injectable()
export class SessionService {
  private _current_user: User;
  private _tmp_storage: any = {};

  constructor(
    private storage: LocalStorageService
  ) {
    this.storage = storage;
    this._current_user = this.storage.get<User>('currentUser');
  }

  save<T>(key: string, item: T) {
    this.storage.set(key, item);
    return true;
  }
  get<T>(key: string): T {
    return this.storage.get<T>(key);
  }

  save_tmp<T>(key: string, item: T | any) {
    this._tmp_storage[key] = item;
    return true;
  }
  get_tmp<T>(key: string): T | any {
    return this._tmp_storage[key];
  }

  // just memoize user if we can
  get current_user(): User {
    return this._current_user ||
           (this._current_user = this.storage.get<User>('currentUser')) ||
           null;
  }
  // save user changes in memory & storage
  set current_user(user: User) {
    this._current_user = user;
    this.storage.set('currentUser', user);
    return;
  }

  isUserSignedIn() {
    if (this.current_user && this.current_user.token) {
      return true;
    }

    return false;
  }

  sign_in(user: User) {
    if (user.token) {
      this.current_user = user;
      return true;
    } else {
      return false;
    }
  }
  sign_out() {
    this._tmp_storage = {};
    this.current_user = null;
    this.storage.clearAll();
    return true;
  }
}
