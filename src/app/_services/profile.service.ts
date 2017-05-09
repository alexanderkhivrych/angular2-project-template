import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiRequestService } from './api-request.service';
import {
  ProfileInterface,
  FamilyInterface,
  ChildInterface,
  PetInterface
} from '../_models/profile/index';

@Injectable()
export class ProfileService {

  public child = {
    create: (child: ChildInterface) => {
      return this.api.post('profile/child', JSON.stringify(child));
    },
    find: (child_id: number | string): Observable<ChildInterface> => {
      return this.api.get<ChildInterface>(`profile/child/${child_id}`);
    },
    destroy: (child_id: number | string) => {
      return this.api.delete(`profile/child/${child_id}`);
    }
  };

  public family = {
    create: (family: FamilyInterface) => {
      return this.api.post('profile/family', JSON.stringify(family));
    },
    find: (family_id: number | string): Observable<FamilyInterface> => {
      return this.api.get<FamilyInterface>(`profile/family/${family_id}`);
    },
    destroy: (family_id: number | string) => {
      return this.api.delete(`profile/family/${family_id}`);
    }
  };

  public pet = {
    create: (pet: PetInterface) => {
      return this.api.post('profile/pet', JSON.stringify(pet));
    },
    find: (pet_id: number | string): Observable<PetInterface> => {
      return this.api.get<PetInterface>(`profile/pet/${pet_id}`);
    },
    destroy: (pet_id: number | string) => {
      return this.api.delete(`profile/pet/${pet_id}`);
    }
  };

  get(): Observable<ProfileInterface> {
    // return this.api.get('profile');
    return this.api.getSlash<ProfileInterface>('profile');
  }

  update(profile: ProfileInterface) {
    return this.api.put('profile', JSON.stringify(profile));
  }

  species() {
    return this.api.get('profile/species');
  }

  constructor(
    private api: ApiRequestService
  ) { }
}
