import { Component, OnInit, NgZone } from '@angular/core';
import {
  SessionService, BordersService, HousesService, AccountService
} from '../../_services/index';
import {
  Polygon, Point, BorderInterface, HouseInterface, InhabitantInterface
} from '../../_models/index';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

export const DISABLE_HOUSES_ZOOM = 14;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: [`
    app-map,
    sebm-google-map,
    ng2-map {
      height: 100%;
      min-height: 100%;
    }
  `]
})
export class MapComponent implements OnInit {
  public apiLoaded = false;
  private currentPath: string;
  public isHousesVisible: boolean;
  public border: BorderInterface;
  public nearbyBorders: Array<BorderInterface> = [];
  public borderHouses: Array<HouseInterface> = [];
  public housesCount: number;
  public usersCount: number;
  public myLocation: Point = new Point({lat: 50.4509591, lng: 30.5226018});
  public initialZoom = 16;
  public selectedHouse: HouseInterface;
  public locationPoint: Point;
  public inhabitants: Array<InhabitantInterface>;

  constructor(
    private session: SessionService,
    private account: AccountService,
    private borders: BordersService,
    private houses: HousesService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    const config = this.session.get_tmp('cabinetConfig');
    if (config != null) {
      config.wideScreen = true;
    }
    this.currentPath = this.router.url;

    eval('window.ttt = this');

    this.isHousesVisible = this.initialZoom > DISABLE_HOUSES_ZOOM;

    this.borders.my().subscribe(data => {
      this.border = <BorderInterface> data;
      this.border.polygon = new Polygon(this.border.polyCoords);
    });

    const bordersReq = this.borders.near();
    const accountReq = this.account.full(false);
    const housesReq = this.borders.houses();
    Observable.forkJoin(accountReq, housesReq, bordersReq)
              .subscribe(([accountData, housesData, nearbyBordersData]) => {

      this.borderHouses = (<Array<HouseInterface>>housesData['houses']).map(house => {
        house.polygon = new Polygon(house.polyCoords);
        return house;
      });
      this.housesCount = housesData['apparments_count'] || 0;
      this.usersCount = housesData['users_count'] || 0;

      this.nearbyBorders = (<Array<BorderInterface>>nearbyBordersData).map(border => {
        border.polygon = new Polygon(border.polyCoords);
        border.connected = false;
        for (let i = accountData.connected_neighborhood.length - 1; i >= 0; i--) {
          if (accountData.connected_neighborhood[i] === border.id) {
            border.connected = true;
            break;
          }
        }
        return border;
      });

      for (let i = this.borderHouses.length - 1; i >= 0; i--) {
        if (this.borderHouses[i].id === accountData.house.id) {
          this.selectedHouse = this.borderHouses[i];
          this.selectHouse(this.selectedHouse);
          break;
        }
      }
    });

    // used cached request to get location immediately
    this.account.full().subscribe(data => {
      this.myLocation = new Point(data.location.google_point);
    });

    this.router.events.subscribe(event => {
      if ((event instanceof NavigationStart) && (event.url !== this.currentPath)) {
        if (config != null) {
          config.wideScreen = false;
        }
      }
    });
  }

  private selectHouse(house: HouseInterface) {
    // TODO
    // remove this shit when get real location
    if (this.apiLoaded) {
      const bounds = new google.maps.LatLngBounds();
      house.polyCoords.forEach(point => bounds.extend(point));
      this.locationPoint = new Point(bounds.getCenter());

    }

    this.houses.inhabitants(house.id).subscribe(data => {
      console.log('inhabitants loaded', data);
      this.inhabitants = <Array<InhabitantInterface>>data;
    });

    this.selectedHouse = house;
    //
  }

  onConnectedBordersChanged(updatedBorder, isConnected) {
    console.log('connected borders updated:', isConnected);
    let connected = this.nearbyBorders
                        .filter(border => border.connected && border.id !== updatedBorder.id)
                        .map(border => border.id);
    if (isConnected) connected.push(updatedBorder.id);
    this.account.update({
      connected_neighborhood: connected
    }).subscribe(result => { console.log('connected borders saved'); });
  }

  onMapZoom(evt) {
    const zoom = evt.target.getZoom();
    this.ngZone.run(() => {
      this.isHousesVisible = zoom > DISABLE_HOUSES_ZOOM;
    });
  }

  onClickHouse(evt, house) {
    this.ngZone.run(() => {
      console.log(house.id);
      this.selectHouse(house);
    });
  }

  onMapInit(map) {
    this.ngZone.run(() => {
      this.apiLoaded = true;
    });
  }
}
