import { Injectable } from '@angular/core';

import { ApiRequestService } from './api-request.service';
import { Polygon } from '../_models/map/index';

@Injectable()
export class HousesService {

  constructor(
    private api: ApiRequestService
  ) { }

  find(id) {
    return this.api.get(`address/house/${id}`);
  }

  create(location_id: number | string, polygon: Polygon) {
    let house = {
      location: location_id,
      polygon: polygon.toGeoPolygon()
    };
    return this.api.post(`address/house`, JSON.stringify(house));
  }

  update(house_id: number | string, polygon: Polygon) {
    let house = {
      polygon: polygon.toGeoPolygon()
    };
    return this.api.post(`address/house/${house_id}`, JSON.stringify(house));
  }

  propouseUpdate(house_id: number | string, polygon: Polygon) {
    let house = {
      polygon: polygon.toGeoPolygon()
    };
    return this.api.post(`address/house/${house_id}/propouse`, JSON.stringify(house));
  }

  inhabitants(id) {
    return this.api.get(`address/house/${id}/users`);
  }
}
