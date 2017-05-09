/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CabinetGuardService } from './cabinet-guard.service';

describe('CabinetGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CabinetGuardService]
    });
  });

  it('should ...', inject([CabinetGuardService], (service: CabinetGuardService) => {
    expect(service).toBeTruthy();
  }));
});
