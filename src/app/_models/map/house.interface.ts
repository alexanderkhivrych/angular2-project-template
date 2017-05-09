import { LatLonInterface } from './point';
import { Polygon } from './polygon';

// "id": 9915,
// "polyCoords": [],
// "building_type": 0,
// "floor_count": null,
// "apt_count": null,
// "block_count": null,
// "confirmed": false,
// "location": 13803,
// "neighborhood": null,
// "organization": null,
// "users": 3
export interface HouseInterface {
  id?: number;
  polyCoords: Array<LatLonInterface>;
  location: number;
  neighborhood?: number;

  polygon?: Polygon;
  building_type?: number | string;
  confirmed?: boolean;
  users?: number;
}
