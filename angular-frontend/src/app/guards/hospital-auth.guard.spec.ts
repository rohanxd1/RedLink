import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hospitalAuthGuard } from './hospital-auth.guard';

describe('hospitalAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hospitalAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
