import { TestBed } from '@angular/core/testing';

import { ConexionGuardGuard } from './conexion-guard.guard';

describe('ConexionGuardGuard', () => {
  let guard: ConexionGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConexionGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
