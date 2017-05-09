import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router }     from '@angular/router';
import { NgForm }     from '@angular/forms';
import {
  SessionService, AccountService
} from '../../../_services/index';
import { Point, Polygon } from '../../../_models/map/index'

import { Ng2MapComponent } from 'ng2-map';

import { BordersService } from '../../../_services/borders.service'

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styles: [`
    sebm-google-map, ng2-map {height: 100%;}
  `]
})
export class NameComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public zoom = 16;
  public modeSharedData: any;
  public model: any = {};

  public mapPosition: Point;
  public locationPoint: Point;
  public housePolygon: Polygon;
  public borderPolygon: Polygon;
  public border_id: number;

  errors: any = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    private account: AccountService,
    private borders: BordersService
  ) { }

  ngOnInit() {
    eval('window.ttt=this');

    this.mapPosition = this.session.get_tmp('mapPosition');
    if (this.mapPosition == null) {
      this.router.navigate(['../intro'], {relativeTo: this.route});
      return null;
    }
    this.latitude = this.mapPosition.lat;
    this.longitude = this.mapPosition.lng;
    this.locationPoint = this.session.get_tmp('locationPoint');

    const zoom = this.session.get_tmp('mapZoom');
    if (zoom != null) { this.zoom = zoom; }

    this.borderPolygon = this.session.get_tmp('borderPolygon');
    if (this.borderPolygon == null) {
      // redirect to drawing mode if no saved polygon
      this.router.navigate(['../draw'], { relativeTo: this.route });
      return null;
    }

    this.modeSharedData = this.session.get_tmp('sign-up/draw/modeSharedData');
    this.modeSharedData.title = 'Крок 2. оберіть назву вашої Спільноти';

    this.account.full(false).subscribe(
      data => {
        if ((data.neighborhood != null) && ('id' in data.neighborhood)) {
          this.border_id = data.neighborhood.id;
          this.model.name = data.neighborhood.name;

          this.modeSharedData.title = 'Крок 2. запропонуйте назву вашої Спільноти';
        }
      },
      error => {
        console.log('some error occured');
      }
    );
  }

  checkName() {
    // TODO
    // no API availale
  }

  private createBorder(ngForm: NgForm) {
    this.borders.create(this.model.name, this.borderPolygon).subscribe(
      data => {
        console.log('submitted', data);
        this.account.update({ neighborhood: data.id })
            .subscribe(acc => {
              this.router.navigate(['../account'], {relativeTo: this.route.parent});
            });
      },
      error => {
        this.errors = error;
        ngForm.form.markAsUntouched();
        this.loading = false;
      });
  }

  private updateBorder(ngForm: NgForm) {
    this.borders.propouseUpdate(this.border_id, this.model.name, this.borderPolygon).subscribe(
      data => {
        console.log('submitted', data);
        this.account.update({ neighborhood: data.id })
            .subscribe(acc => {
              this.router.navigate(['../account'], {relativeTo: this.route.parent});
            });
      },
      error => {
        this.errors = error;
        ngForm.form.markAsUntouched();
        this.loading = false;
      });
  }

  submit(ngForm: NgForm) {
    if (!ngForm.form.valid) {
      console.log('invalid', ngForm.form.valid);
      return;
    }
    this.loading = true;
    this.errors = null;
    if (this.border_id != null) {
      this.updateBorder(ngForm);
    } else {
      this.createBorder(ngForm);
    }
  }
}
