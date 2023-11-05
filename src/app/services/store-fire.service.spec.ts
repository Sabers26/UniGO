import { TestBed } from '@angular/core/testing';

import { StoreFireService } from './store-fire.service';

describe('StoreFireService', () => {
  let service: StoreFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
