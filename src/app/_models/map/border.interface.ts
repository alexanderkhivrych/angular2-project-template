import { HouseInterface } from './house.interface';
import { LatLonInterface } from './point';
import { Polygon } from './polygon';

// id: 15
// confirmed: false
// houses: Array<House>
// polyCoords: Polygon
// users_count: 33
export interface BorderInterface {
  name: string;
  houses: Array<HouseInterface>;
  polyCoords: Array<LatLonInterface>;
  polygon: Polygon;
  id?: number;
  confirmed?: boolean;
  users_count?: number;
  connected?: boolean;
}
