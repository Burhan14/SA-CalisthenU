import { TestBed } from '@angular/core/testing';

import { LocService } from './loc.service';

describe('LocService', () => {
  let service: LocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
