import { TestBed } from '@angular/core/testing';

import { ViajesGuard } from './viajes.guard';

describe('ViajesGuard', () => {
  let guard: ViajesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViajesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
