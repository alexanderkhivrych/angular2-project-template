import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/index';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {
  public cabinetConfig = {
    wideScreen: false
  };
  constructor(
    private session: SessionService
  ) {
    this.session.save_tmp('cabinetConfig', this.cabinetConfig);
  }

  ngOnInit() {
  }

}
