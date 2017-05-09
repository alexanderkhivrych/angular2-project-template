import {
  Component, OnInit, ViewChild, NgZone, ElementRef
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { GeoCoder } from 'ng2-map';

import {
  BordersService, HousesService, LocationsService,
  AuthService, SessionService, AccountService
} from '../../_services/index';

import { User } from '../../_models/user';
import { Location, Polygon, Point } from '../../_models/map/index';

@Component({
  selector: 'app-signup-address',
  templateUrl: './address.component.html',
  styles: [`
    sebm-google-map, ng2-map {height: 100%;}
  `]
})
export class AddressComponent implements OnInit {
  model: any = {};
  loading = false;

  public location: Location;
  public saved_location: any;
  private homeDrawing = false;

  public latitude: number;
  public longitude: number;
  public zoom: number;
  public apiLoaded = false;
  public autocomplete: google.maps.places.Autocomplete;
  public errors: any;
  public house_id: number;
  public locationPoint: Point;
  public housePolygon: Polygon;
  public nearbyHouses: Array<Polygon> = [];
  public housePolygonReady = false;
  public locationPending = false;
  public updateHouse = false;

  public STATES = {
    DEFAULT: 1,
    HOUSE_SETUP: 2,
    HOUSE_READY: 3,
    HOUSE_SAVED: 4
  };
  public state: number;

  @ViewChild('search_address')
  public searchElementRef: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private session: SessionService,
    private ngZone: NgZone,
    private borders: BordersService,
    private locations: LocationsService,
    private houses: HousesService,
    private account: AccountService,
    private geoCoder: GeoCoder
  ) { }

  ngOnInit() {
    this.state = this.STATES.DEFAULT;
    if (this.session.isUserSignedIn()) {
      this.account.full().subscribe(data => {
        if (data.full_address === true) {
          this.saved_location = data.location;
          this.locationPoint = new Point(this.saved_location.point);
          this.model.email = this.session.current_user.email;
          this.model.password_confirmation = this.model.password = (new Array(9)).join('*');

          if ((data.house != null) && ('polygon' in data.house)) {
            this.state = this.STATES.HOUSE_SAVED;
            this.house_id = data.house.id;
            this.housePolygon = new Polygon(data.house.polygon);
          } else {
            this.loadNearby();
            this.state = this.STATES.HOUSE_SETUP;
            this.router.navigate([], { queryParams: { tips: 2 }, relativeTo: this.route });
          }
        }
      });
    } else {
      // set current position by browser location data
      // just for good user experience
      this.setDevicePosition();
    }

    this.account.saveCurrentPath();
    eval('window.ttt=this');
  }

  private loadNearby() {
    if ((this.saved_location == null) || (this.saved_location.id == null)) { return; }
    this.locations.nearHouses(this.saved_location.id).subscribe(houses => {
      if ((houses != null) && Array.isArray(houses)) {
        houses.filter(house => {
                return house.id !== this.house_id;
              })
              .forEach(house => {
                if ('polygon' in house) {
                  this.nearbyHouses.push(new Polygon(house.polygon));
                }
              });
      }
    });
  }

  // just save values to tmp storage (lost on page reload)
  onMapInit(map) {
    if (this.locationPoint != null) {
      this.searchClosestPlace(this.locationPoint);
    }
    this.loadPlacesAutocomplete();
    this.ngZone.run(() => {
      this.apiLoaded = true;
    });
    google.maps.event.addListener(map, 'center_changed', () => {
      this.session.save_tmp('mapPosition', new Point(map.getCenter()));
    });
    google.maps.event.addListener(map, 'zoom_changed', () => {
      this.session.save_tmp('mapZoom', map.getZoom());
    });
  }

  onDrawingManagerInit(drawingManager) {
    google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
      this.ngZone.run (() => {
        this.housePolygon = new Polygon(polygon.getPath().getArray());
        polygon.setMap(null);
        this.state = this.STATES.HOUSE_READY;
        this.housePolygonReady = true;
      });
    });
  }

  private loadPlacesAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement,
      { types: ['address'] }
    );
    autocomplete.addListener(
      'place_changed',
      () => {
        this.ngZone.run(() => {
          // get the place result
          this.setupPlace(autocomplete.getPlace());
          // reapply selected by autocomplete address to model
          this.model.address = this.searchElementRef.nativeElement.value;
      });
    });
  }

  private setupPlace(place) {
    this.location = new Location(place);

    // reapply selected by autocomplete address to model
    this.model.address = this.location.getAddress();
    this.model.house = this.location.street_number;

    // verify result
    if (place.geometry != null) {
      // set latitude, longitude and zoom
      this.locationPoint = new Point(place.geometry.location);
      this.latitude = this.locationPoint.latitude;
      this.longitude = this.locationPoint.longitude;
      this.zoom = this.zoom || 17;
    }
  }

  // add entered by user street number
  // and reapply search location
  updateLocationSearch() {
    if (this.location && (this.model.house != null)) {
      this.locationPending = true;
      this.location.street_number = this.model.house;
      this.geoCoder.geocode({address: this.location.getAddress()})
          .subscribe(
            places => {
              // need run this in zone because this subscription resolved outside of angular
              this.ngZone.run(() => {
                if (!Array.isArray(places) || (places.length < 1)) { return; }
                this.setupPlace(places[0]);
                this.model.address = this.location.getAddress();
                this.locationPending = false;
              });
            },
            error => {
              this.locationPending = false;
            }
          );
    }
  }

  onMarkerDragged(event) {
    this.searchClosestPlace(new Point(event.latLng));
  }

  private searchClosestPlace(point: Point) {
    this.geoCoder.geocode({location: point})
        .subscribe(
          places => {
            // need run this in zone because this subscription resolved outside of angular
            this.ngZone.run(() => {
              if (!Array.isArray(places) || (places.length < 1)) { return; }
              this.setupPlace(places[0]);
              this.model.address = this.location.getAddress();
              this.locationPending = false;
            });
          },
          error => {
            if ((this.latitude == null) || (this.longitude == null)) {
              this.latitude = this.locationPoint.latitude;
              this.longitude = this.locationPoint.longitude;
            }
            this.locationPending = false;
          }
        );
  }

  private createUser() {
    this.loading = true;
    // this.session.sign_in(user);
    this.auth.create(new User({
          email: this.model.email,
          password: this.model.password,
        }))
        .subscribe(
          data => {
            // should recive something like this:
            // {"token":"d2435f2bc8e7fa1be5444df3cadf1ff2fe8499b3"}

            console.log('registered', data);
            this.saveLocation(this.location);

            // this.router.navigate(['/sign-up/account']);
            this.loading = false;
          },
          error => {
            this.loading = false;
            this.errors = error;
          });
  }

  // try to create location
  // and process results
  public saveLocation(location) {
    this.locations.create(location)
        .subscribe(
          data => {
            console.log('loc success', data);
            this.saved_location = data;
            this.saveLocationToAccount(data);
          },
          error => {
            console.log('loc fail', error);
            this.saved_location = null;
            this.errors = error;
          });
  }

  // save recived location id in user data
  public saveLocationToAccount(location) {
    if (!location || (location.id == null)) { return; }
    this.account.update({location: location.id})
        .subscribe(
          data => {
            this.account.full()
                .subscribe(acc => {
                  if ((acc.house != null) && (acc.house.id != null) && acc.house.polygon) {
                    console.log('home already exists');

                    this.house_id = acc.house.id;
                    this.housePolygon = new Polygon(acc.house.polygon);
                    this.state = this.STATES.HOUSE_SAVED;
                  } else {
                    console.log('switch to drawing mode');

                    this.homeDrawing = true;
                    this.state = this.STATES.HOUSE_SETUP;
                    this.router.navigate([], { queryParams: { tips: 2 }, relativeTo: this.route });
                    this.loadNearby();
                  }
                });
          },
          error => {
            console.log('account details fail', error);
            this.errors = error;
          });
  }

  private addHouse() {
    if (this.house_id == null) {
      // no house saved - lets create new one
      this.houses.create(this.saved_location.id, this.housePolygon)
        .subscribe(
          data => {
            this.router.navigate(['../account'], { relativeTo: this.route });
            // this.state = this.STATES.HOUSE_SAVED;
            // this.saved_location = data;
          },
          error => {
            this.errors = error;
          });

    } else {
      // no house already exists - lets update it
      this.houses.propouseUpdate(this.house_id, this.housePolygon)
        .subscribe(
          data => {
            this.state = this.STATES.HOUSE_SAVED;
            this.saved_location = data;
          },
          error => {
            this.errors = error;
          });
    }
  }

  resetHomePolygon() {
    this.state = this.STATES.HOUSE_SETUP;
    this.housePolygon = new Polygon([]);
    this.loadNearby();
    if (this.house_id != null) {
      console.log('switched to propose mode');
    }
  }

  save(evt, form) {
    console.log('submitted', this.state, this.model);
    switch (this.state) {
      case this.STATES.DEFAULT:
        if (form && form.valid) {
          this.createUser();
        }
        break;
      case this.STATES.HOUSE_SETUP:
        // nothing to do now
        break;
      case this.STATES.HOUSE_READY:
        this.addHouse();
        break;
      case this.STATES.HOUSE_SAVED:
        this.router.navigate(['../account'], { relativeTo: this.route });
        break;
      default:
        // something goes wrong
        break;
    }
  }

  private setDevicePosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.locationPoint = new Point(position.coords);
      });
    }
  }
}
