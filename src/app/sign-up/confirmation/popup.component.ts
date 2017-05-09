import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

export const CONFIRM_ACCOUNT_POPUP_FRAGMENT = 'confirm';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponent implements OnInit {
  public isVisible = false;
  public services = [
    {value: 1, label: 'Lanet'},
    {value: 2, label: 'Freenet'},
    {value: 3, label: 'Ip-net'},
    {value: 4, label: 'Lanet'},
    {value: 5, label: 'Freenet'},
    {value: 6, label: 'Ip-net'}
  ];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.fragment
        .subscribe(fragment => {
          console.log('update fragment', fragment);
          this.isVisible = (fragment === CONFIRM_ACCOUNT_POPUP_FRAGMENT) ;
        });
  }

}
