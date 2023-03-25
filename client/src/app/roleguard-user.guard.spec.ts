import { TestBed } from '@angular/core/testing';

import { RoleguardUserGuard } from './roleguard-user.guard';

describe('RoleguardUserGuard', () => {
  let guard: RoleguardUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleguardUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
