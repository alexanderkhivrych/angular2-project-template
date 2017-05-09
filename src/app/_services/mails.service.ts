import { Injectable } from '@angular/core';

import { ApiRequestService } from './api-request.service';

@Injectable()
export class MailsService {

  constructor(
    private api: ApiRequestService
  ) { }

  getMailList() {
    return this.api.get('mail');
  }
  getChat(ownerID) {
    return this.api.get(`mail/chat?owner=${ownerID}`);
  }
  getMailDetails(id) {
    return this.api.get(`mail/${id}`);
  }
  getDocs(senderId){
    return this.api.get(`mail/chat/${senderId}/docs`);
  }
  getPhotos(senderId){
    return this.api.get(`mail/chat/${senderId}/photos`);
  }
  send(data) {
    return this.api.post('mail', data, false)
  }
}
