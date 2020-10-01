import { TestBed } from '@angular/core/testing';

import { FranceService } from './france.service';

describe('FranceService', () => {
  let service: FranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
