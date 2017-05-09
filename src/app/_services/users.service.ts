import { Injectable } from '@angular/core';

import { ApiRequestService } from './api-request.service';

@Injectable()
export class UsersService {

  constructor(
    private api: ApiRequestService
  ) { }

  getList() {
    return this.api.get(`users/lists`);
  }
}
