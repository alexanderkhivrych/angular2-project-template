export interface ProfileInterface {
  address?: string;
  avatar?: string;
  first_name?: string;
  last_name?: string;
  birthday?: any;
  interests?: Array<any>;
  about_me?: any;
  family?: Array<any>;
  childrens?: Array<any>;
  pets?: Array<any>;
  proffesion?: any;
  activity?: {
    activity?: {
      messages?: number;
      makeevent?: number;
      like?: number;
      makerentpost?: number;
      polls?: number;
      makefundrising?: number;
      posts?: number;
      leavereply?: number;
      makesalepost?: number
    }
  };
  invites?: Array<any>;
  settings?: Array<any>;
  in_bussines?: boolean;
  in_agency?: boolean;
  is_lead?: boolean;
  is_master?: boolean;
}

export class Profile implements ProfileInterface {
  public update(params: any = {}) {
    for (let key in params) {
      this[key] = params[key];
    }
  }

  constructor(params: any = {}) {
    this.update(params);
  }
}
