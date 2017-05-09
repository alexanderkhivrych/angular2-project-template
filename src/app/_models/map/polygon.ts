import { Point } from './point';

export class GeoPolygon {
  public readonly type: string = 'Polygon';
  public coordinates: Array<Array<Array<number>>>;

  constructor(coords: Array<Array<number>>) {
    // add last point to close shape
    coords.push(coords[0]);
    this.coordinates = [coords];
  }
}

export class Polygon {
  public path: Array<Point>

  public toArray(): Array<Array<number>> {
    return this.path.map<Array<number>>(point => point.toArray());
  }

  public toGeoPolygon(): GeoPolygon {
    return new GeoPolygon(this.toArray());
  }

  public fromGeoPolygon(polygon: GeoPolygon) {
    this.path = polygon.coordinates[0].map<Point>((pt) => new Point(pt));
  }

  constructor(params: any) {
    if (params['type'] === 'Polygon') {
      this.fromGeoPolygon(params);
    } else if (Array.isArray(params)) {
      this.path = params.map<Point>((pt) => new Point(pt));
    }
  }
}
