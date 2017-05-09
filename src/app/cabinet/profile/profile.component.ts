import { Component, OnInit } from '@angular/core';
import { Profile } from '../../_models/profile/index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  public profile = new Profile();

  constructor() { }

  ngOnInit() {
  }

}
