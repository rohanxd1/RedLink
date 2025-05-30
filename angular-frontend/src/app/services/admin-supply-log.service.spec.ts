import { TestBed } from '@angular/core/testing';

import { AdminSupplyLogService } from './admin-supply-log.service';

describe('AdminSupplyLogService', () => {
  let service: AdminSupplyLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSupplyLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
