import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {
  AccountService, SessionService, ProfileService
} from '../../../_services/index';
import { UserInterface } from '../../../_models/index';

@Component({
  selector: 'app-cabinet-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user: UserInterface;
  public isDropdownActive = false;
  public isSearchActive = false;
  public dashboardPath: string;

  constructor(
    private router: Router,
    private location: Location,
    private account: AccountService,
    private session: SessionService,
    private profile: ProfileService
  ) { }

  private closeDropOnNavigation() {
    this.router.events.subscribe(event => {
      // console.log('route event', event);
      this.isDropdownActive = false;
    });
  }

  public signOut(evt) {
    if (evt && 'preventDefault' in evt) {
      evt.preventDefault();
    }
    this.session.sign_out();
    this.router.navigateByUrl('/');
  }

  public toggleDropdown(evt) {
    if (evt && 'preventDefault' in evt) {
      evt.preventDefault();
    }
    this.isDropdownActive = !this.isDropdownActive;
  }
  public toggleSearch(evt) {
    if (evt && 'preventDefault' in evt) {
      evt.preventDefault();
    }
    this.isSearchActive = !this.isSearchActive;
  }

  public pathTo(scope) {
    return `${this.dashboardPath}/${scope}`;
  }

  ngOnInit() {
    eval('window.hhh = this');

    this.dashboardPath = this.account.dashboardPath();
    this.account.full().subscribe((data: UserInterface) => {
      this.user = data;
    });
    this.closeDropOnNavigation();
  }

}
