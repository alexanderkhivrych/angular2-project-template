import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  SessionService, AccountService
} from '../../../_services/index';
import { Point, Polygon } from '../../../_models/map/index';

import { Ng2MapComponent } from 'ng2-map';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styles: [`
    sebm-google-map, ng2-map { height: 100%; }
  `]
})
export class IntroComponent implements OnInit {
  public zoom = 18;

  public modeSharedData: any;
  public mapPosition;
  public locationPoint: Point;
  public housePolygon: Polygon;
  public border_id: number;
  public borderPolygon: Polygon;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    private account: AccountService
  ) { }

  ngOnInit() {
    eval('window.ttt=this');

    this.modeSharedData = this.session.get_tmp('sign-up/draw/modeSharedData');
    this.modeSharedData.title = 'Чудова новина! Мережа Сусід.Online тепер доступнайу вашому районі.';

    if (!this.session.isUserSignedIn()) {
      this.router.navigate(['../address'], {relativeTo: this.route.parent});
      return false;
    }
    this.account.full()
        .subscribe(
          data => {
            console.log('map position');
            this.mapPosition = new Point(data.location.point);
            this.locationPoint = new Point(data.location.point);
            this.session.save_tmp('locationPoint', this.locationPoint);

            this.session.save_tmp('mapPosition', this.mapPosition);
            this.session.save_tmp('mapZoom', this.zoom);

            if (data.house && 'polygon' in data.house) {
              this.housePolygon = new Polygon(data.house.polygon);
            }

            if ((data.neighborhood != null) && ('id' in data.neighborhood)) {
              this.border_id = data.neighborhood.id;
              this.borderPolygon = new Polygon(data.neighborhood.polygon);
              this.modeSharedData.title = 'Бажаєте запропонувати власні границі району?';
            }

            this.account.saveCurrentPath();
          },
          error => {
            this.router.navigate(['../address'], { relativeTo: this.route.parent });
          });

    const zoom = this.session.get_tmp('mapZoom');
    if (zoom != null) {
      this.zoom = zoom;
    }
  }

  // just save values to tmp storage (lost on page reload)
  onMapInit(map) {
    console.log('map init');
    google.maps.event.addListener(map, 'center_changed', () => {
      this.session.save_tmp('mapPosition', new Point(map.getCenter()));
    });
    google.maps.event.addListener(map, 'zoom_changed', () => {
      this.session.save_tmp('mapZoom', map.getZoom());
    });
  }
}
