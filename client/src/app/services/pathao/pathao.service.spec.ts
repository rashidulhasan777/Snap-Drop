import { TestBed } from '@angular/core/testing';

import { PathaoService } from './pathao.service';

describe('PathaoService', () => {
  let service: PathaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
