import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ApiRequestService } from './api-request.service';

import { Location, Polygon } from '../_models/map/index'

const GMAPS_API_ALIASES = {
  route: 'street',
  street_number: 'street_number',
  locality: 'city',
  // administrative_area_level_1: 'state',
  administrative_area_level_2: 'district',
  sublocality: 'sublocation',
  postal_code: 'zip'
}

@Injectable()
export class BordersService {

  constructor(
    private api: ApiRequestService
  ) { }


  all() {
    return this.api.get(`address/neighborhood`);
  }

  create(name: string, polygon: Polygon) {
    return this.api.post('address/neighborhood', JSON.stringify({
      name: name,
      polygon: polygon.toGeoPolygon()
    }));
  }

  update(border_id: number | string, polygon: Polygon) {
    let neighborhood = {
      polygon: polygon.toGeoPolygon()
    };
    return this.api.post(`address/neighborhood/${border_id}`, JSON.stringify(neighborhood));
  }

  propouseUpdate(border_id: number | string, name: string, polygon: Polygon) {
    let neighborhood = {};
    if (polygon != null) {
      neighborhood['polygon'] = polygon.toGeoPolygon()
    }
    if (name != null) {
      neighborhood['name'] = name;
    }
    return this.api.post(`address/neighborhood/${border_id}/propouse`, JSON.stringify(neighborhood));
  }

  // additional requests
  my() {
    return this.api.get(`address/neighborhood/my`);
  }

  near() {
    return this.api.get(`address/neighborhood/near`);
  }

  houses() {
    return this.api.get(`address/neighborhood/houses`);
  }
}
