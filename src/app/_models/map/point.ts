export interface LatLonInterface {
  lat: number;
  lng: number;
}

export class GeoPoint {
  public readonly type = 'Point';
  public coordinates: Array<number>;
  constructor(coords: Array<number>) {
    this.coordinates = coords;
  }
}

export class Point {
  public latitude: number;
  public longitude: number;

  public get lat(): number {
    return this.latitude;
  }
  public get lng(): number {
    return this.longitude;
  }
  public set lat(latitude: number) {
    this.latitude = latitude;
  }
  public set lng(longitude: number) {
    this.longitude = longitude;
  }

  public toArray(): Array<number> {
    return [this.longitude, this.latitude]
  }

  public toGeoPoint(): GeoPoint {
    return new GeoPoint(this.toArray());
  }

  public fromGeoPoint(pt: GeoPoint) {
    this.longitude = pt.coordinates[0];
    this.latitude = pt.coordinates[1];
  }

  public update(params: any) {
    if (Array.isArray(params)) {
      // this is geo array
      this.longitude = params[0];
      this.latitude = params[1];
    } else if (params['type'] === 'Point') {
      // this is geo point
      this.fromGeoPoint(params);
    } else if ((typeof(params.lat) === 'function') && (typeof(params.lng) === 'function')) {
      // this is google location
      this.latitude = params.lat();
      this.longitude = params.lng();
    } else {
      // some else
      this.latitude = params.lat || params.latitude;
      this.longitude = params.lng || params.longitude;
    }
  }

  constructor(params: any) {
    this.update(params);
  }
}
