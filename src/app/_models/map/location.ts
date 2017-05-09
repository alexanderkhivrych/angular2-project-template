import { Point, GeoPoint } from './point';

// {
//   "street": "проспект Володимира Маяковського",
//   "street_number": "1",
//   "city": "Київ",
//   "state": "місто Київ",
//   "district": "місто Київ",
//   "sublocation": "Деснянський район",
//   "zip": "01001",
//   "point": {
//     "type": "Point",
//     "coordinates": [-123.0208, 440.0464]
//   }
// }

interface GoogleLocation {
  lat(): number,
  lng(): number
}
interface GoogleGeometry {
  location: GoogleLocation
}
interface AddressComponent {
  long_name: string,
  short_name: string,
  types: Array<string>
}
interface GooglePlace {
  address_components: Array<AddressComponent>,
  geometry: GoogleGeometry
}

const GMAPS_API_ALIASES = {
  route: 'street',
  street_number: 'street_number',
  postal_code: 'zip',
  sublocality: 'sublocation',
  locality: 'city',
  administrative_area_level_2: 'district',
  administrative_area_level_1: 'state',
  country: 'country'
}

const ADDRESS_PARTS = [
  'street', 'street_number', 'city', 'state', 'country'
];

export class Location {
  public street_number: string;
  public street: string;
  public zip: string;
  public sublocation: string;
  public city: string;
  public district: string;
  public state: string;
  public country: string;
  public point: GeoPoint;

  public toArray(): Array<string> {
    let ans: Array<string> = [];
    return ans;
  }
  public getAddress(): string {
    return ADDRESS_PARTS.map(part => this[part])
                        .filter(part => part != null)
                        .join(', ');
  }

  public static getAddress(location: Location | GooglePlace) {
    if ('address_components' in location) {
      return (new Location(<GooglePlace>location)).getAddress();
    } else {
      return ADDRESS_PARTS.map(part => location[part])
                          .filter(part => part != null)
                          .join(', ');
    }
  }

  public update(place: GooglePlace) {
    if (('address_components' in place) && Array.isArray(place.address_components)) {
      place.address_components.forEach((addr: AddressComponent) => {
        addr.types.forEach(type => {
          if (type in GMAPS_API_ALIASES) {
            this[GMAPS_API_ALIASES[type]] = addr.long_name || addr.short_name;
          }
        });
      });
      this.state = this.state || this.district;
      this.point = (new Point(place.geometry.location)).toGeoPoint();
    }
  }

  constructor(place: GooglePlace) {
    this.update(place);
  }
}
