import { Component, OnInit, ViewChild, NgZone, ElementRef, ContentChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { CheckError } from '../../_directives';

import {
  AuthService, SessionService, AccountService
} from '../../_services/index';
import { Point, Polygon } from '../../_models/map/index';
import { GenderTypes } from '../../_services/gender-types';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styles: [`
    sebm-google-map, ng2-map {height: 100%;}
    .registration_map_notify > a {
      display: block;
      height: 21px;
    }
  `]
})
export class AccountComponent implements OnInit {
  model: any = {};
  loading = false;
  api_ready = false;

  public errors: any;
  public zoom = 16;
  public mapPosition;

  // data from previous steps:
  public borderName: string;
  public locationPoint: Point;
  public housePolygon: Polygon;
  public borderPolygon: Polygon;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private session: SessionService,
    private ngZone: NgZone,
    private gender_types: GenderTypes,
    private account: AccountService
  ) {
    this.account.redirectToCurrentState(true);
  }

  private extractPolygon(raw: any) {
    return raw.polygon.coordinates[0].map(point => {
      return { lng: point[0], lat: point[1] };
    });
  }

  ngOnInit() {
    eval('window.ttt=this');

    this.model.gender = this.gender_types.default.id;
    this.account.full(false).subscribe(data => {
      if (data.neighborhood != null) {
        this.borderName = data.neighborhood.name;
        this.borderPolygon = new Polygon(data.neighborhood.polygon);
      }

      if (data.house != null) {
        this.housePolygon = new Polygon(data.house.polygon);
      }

      if (data.location != null) {
        this.locationPoint = new Point(data.location.point);
      }

      this.ngZone.run(() => {
        this.account.saveCurrentPath();
      });
    },
    error => {
      // redirect to address on error
      this.router.navigate(['../address'], {relativeTo: this.route});
      return false;
    });
  }

  // just save values to tmp storage (lost on page reload)
  onMapInit(map) {
    google.maps.event.addListener(map, 'center_changed', () => {
      this.session.save_tmp<Point>('mapPosition', new Point(map.getCenter()));
    });
    google.maps.event.addListener(map, 'zoom_changed', () => {
      this.session.save_tmp<number>('mapZoom', map.getZoom());
    });
    this.api_ready = true;
  }

  save(form) {
    console.log('submitted', this.model);
    if (form && form.valid) {
      this.loading = true;
      this.account.update(this.model).subscribe(
        data => {
          // navigate to address confirmation page
          this.router.navigate(['../confirm'], {relativeTo: this.route});
        },
        error => {
          this.loading = false;
          this.errors = error;
        });
      this.loading = false;
    }
  }
}
