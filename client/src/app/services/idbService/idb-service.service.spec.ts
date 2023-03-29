import { TestBed } from '@angular/core/testing';

import { IdbServiceService } from './idb-service.service';

describe('IdbServiceService', () => {
  let service: IdbServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdbServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
