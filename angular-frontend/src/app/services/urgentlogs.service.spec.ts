import { TestBed } from '@angular/core/testing';

import { UrgentlogsService } from './urgentlogs.service';

describe('UrgentlogsService', () => {
  let service: UrgentlogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrgentlogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
