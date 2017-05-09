import { Component, OnInit } from '@angular/core';
import { CONFIRM_ACCOUNT_POPUP_FRAGMENT } from '../popup.component';

@Component({
  selector: 'app-email',
  templateUrl: './mail.component.html',
  styles: []
})
export class MailComponent implements OnInit {
  public confirmPopupFragment = CONFIRM_ACCOUNT_POPUP_FRAGMENT;

  constructor() { }

  ngOnInit() {
    eval('window.ttt=this');
  }

}
