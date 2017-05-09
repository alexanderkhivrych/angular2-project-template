import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../../_services/account.service';
import { CONFIRM_ACCOUNT_POPUP_FRAGMENT } from '../popup.component';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styles: []
})
export class DefaultComponent implements OnInit {
  public address: string;
  public confirmPopupFragment = CONFIRM_ACCOUNT_POPUP_FRAGMENT;

  constructor(
    private account: AccountService
  ) { }

  ngOnInit() {
    eval('window.ttt=this');
    this.account.full().subscribe(data => {
      // вул. Короленка 2а кв. 21
      this.address = `вул. ${data.location.street} ${data.location.street_number}`;
      this.account.saveCurrentPath();
    });
  }
}
