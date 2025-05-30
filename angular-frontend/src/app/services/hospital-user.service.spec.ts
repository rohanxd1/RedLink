import { TestBed } from '@angular/core/testing';

import { HospitalUserService } from './hospital-user.service';

describe('HospitalUserService', () => {
  let service: HospitalUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
