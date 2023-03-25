import { TestBed } from '@angular/core/testing';

import { RoleguardLabGuard } from './roleguard-lab.guard';

describe('RoleguardLabGuard', () => {
  let guard: RoleguardLabGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleguardLabGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
