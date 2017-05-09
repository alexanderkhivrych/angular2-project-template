import { Component } from '@angular/core';
import { UsersService, MailsService } from '../../_services/index';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements Component {
  private users: UsersService;
  public lastMails: Array<{}>;

  constructor(private mails: MailsService) {
    this.loadMailList();
  }

  loadMailList () {
    this.mails.getMailList().subscribe((data) => {
      if(Array.isArray(data) && data.length) {
        this.lastMails = data.map((item) => item);
      }
    });
  }
}
