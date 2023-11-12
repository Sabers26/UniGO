import { TestBed } from '@angular/core/testing';

import { NoConexionGuard } from './no-conexion.guard';

describe('NoConexionGuard', () => {
  let guard: NoConexionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoConexionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
