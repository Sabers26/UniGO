import { TestBed } from '@angular/core/testing';

import { NoConexionGuardGuard } from './no-conexion-guard.guard';

describe('NoConexionGuardGuard', () => {
  let guard: NoConexionGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoConexionGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
