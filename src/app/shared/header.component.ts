import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-shared-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(
    private session: SessionService
  ) {
    this.currentUser = session.current_user;
  }

  ngOnInit() {
  }
}
