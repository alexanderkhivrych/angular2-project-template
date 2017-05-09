import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  SessionService, AccountService, LocationsService
} from '../../../_services/index';
import { Point, Polygon } from '../../../_models/map/index'

import { Ng2MapComponent, DrawingManager } from 'ng2-map';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styles: [`
    sebm-google-map, ng2-map {height: 100%;}
  `]
})
export class DrawComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public zoom: number = 16;

  public modeSharedData: any;
  public nextStepAvailable: boolean = false;
  public finished: boolean = false;
  public mapReady: boolean = false;

  public mapPosition: Point;
  public locationPoint: Point;
  public housePolygon: Polygon;
  public borderPolygon: Polygon;
  public nearbyBorders: Array<Polygon> = [];
  public saved_location: any;
  public border_id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    private account: AccountService,
    private locations: LocationsService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    eval('window.ttt=this');
    this.mapPosition = this.session.get_tmp('mapPosition');
    if (this.mapPosition != null) {
      this.latitude = this.mapPosition.latitude;
      this.longitude = this.mapPosition.longitude;
      this.locationPoint = this.session.get_tmp('locationPoint');
    } else {
      this.router.navigate(['../intro'], {relativeTo: this.route});
    }
    let zoom = this.session.get_tmp('mapZoom');
    if (zoom != null) {
      this.zoom = zoom;
    }

    this.account.full(false).subscribe(
      data => {
        this.saved_location = data.location;
        this.loadNearby();
        if ((data.neighborhood != null) && ('id' in data.neighborhood)) {
          this.border_id = data.neighborhood.id;
          this.borderPolygon = new Polygon(data.neighborhood.polygon);
          this.finished = true;
        }
      },
      error => {
        console.log('some error occured');
      }
    )
    // get & update shared data
    this.modeSharedData = this.session.get_tmp('sign-up/draw/modeSharedData');
    this.modeSharedData.title = 'Крок 1: окресліть межі вашого району'
  }

  private loadNearby() {
    if ((this.saved_location == null) || (this.saved_location.id == null)) return;
    this.locations.nearBorders(this.saved_location.id).subscribe(borders => {
      if ((borders != null) && Array.isArray(borders)) {
        borders
          .filter(border => {
            return border.id != this.border_id;
          })
          .forEach(border => {
            if ('polygon' in border) {
              this.nearbyBorders.push(new Polygon(border.polygon));
            } else if ('polyCoords' in border) {
              this.nearbyBorders.push(new Polygon(border.polyCoords));
            }
          });
      }
    });
  }

  resetShape() {
    this.borderPolygon = null;
    this.finished = false;
  }

  nextStep() {
    if (this.finished) {
      this.session.save_tmp('borderPolygon', this.borderPolygon);
      this.router.navigate(['../name'], { relativeTo: this.route });
    }
  }

  // just save values to tmp storage (lost on page reload)
  onMapInit(map) {
    google.maps.event.addListener(map, 'center_changed', ()=> {
      this.session.save_tmp('mapPosition', new Point(map.getCenter()));
    });
    google.maps.event.addListener(map, 'zoom_changed', ()=> {
      this.session.save_tmp('mapZoom', map.getZoom());
    });
    this.mapReady = true
  }

  onDrawingManagerInit(drawingManager) {
    google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon)=> {
      this.ngZone.run (()=> {
        this.borderPolygon = new Polygon(polygon.getPath().getArray());
        this.finished = true;
        polygon.setMap(null);
      });
    });
  }

  private setDevicePosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }
}
