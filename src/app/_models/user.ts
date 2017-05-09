const FILTER_PARAMS = /password/;
const FILTER_SRC = /./g;
const FILTER_DST = '*';

export interface UserInterface {
  id?: number;
  token?: string;
  email?: string;
  password?: string;

  location?: number;
  location_true?: boolean;
  full_address?: boolean;

  house?: number;

  neighborhood?: number;
  connected_neighborhood?: Array<number>;

  name?: string;
  first_name?: string;
  last_name?: string;
  full_name?: boolean;

  avatar?: string;
  avatar_url?: string;
  primary_phone?: string;

  confirmed?: boolean;
  is_agency?: boolean;
  is_verified?: boolean;
  is_lead?: boolean;

  apt?: string;
}

export class User implements UserInterface {
  name: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  avatar_thumb = '/assets/images/user_icon.png';
  token: string;
  confirmed = false;

  private filter(value) {
    if ((typeof(value) === 'string') && FILTER_PARAMS.test(value)) {
      return value.replace(FILTER_SRC, FILTER_DST);
    }
    return value;
  }

  public update(params: any = {}) {
    for (let key in params) {
      this[key] = this.filter(params[key]);
    }
  }

  constructor(params: any = {}) {
    this.update(params);
  }
}
