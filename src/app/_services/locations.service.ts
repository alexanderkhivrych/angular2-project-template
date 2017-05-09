import { Injectable } from '@angular/core';

import { ApiRequestService } from './api-request.service';
import { Point, Polygon, Location } from '../_models/map/index'

@Injectable()
export class LocationsService {

  constructor(
    private api: ApiRequestService
  ) { }

  create(location: Location) {
    return this.api.post('address/location', JSON.stringify(location));
  }

  update(location_id: number | string, location: Location) {
    return this.api.post(`address/location/${location_id}`, JSON.stringify(location));
  }

  propouseUpdate(location_id: number | string, location: Location) {
    return this.api.post(`address/location/${location_id}/propouse`, JSON.stringify(location));
  }

  nearHouses(location_id: number | string) {
    return this.api.get(`address/location/${location_id}/nearhouses`);
  }

  nearBorders(location_id: number | string) {
    return this.api.get(`address/location/${location_id}/nearneighbor`);
  }

  upd1ate(house_id: number | string, polygon: Polygon) {
    let house = {
      polygon: polygon.toGeoPolygon()
    };
    return this.api.post(`address/house/${house_id}`, JSON.stringify(house));
  }
}
