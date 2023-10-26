import { TestBed } from '@angular/core/testing';

import { ControlSesionGuard } from './control-sesion.guard';

describe('ControlSesionGuard', () => {
  let guard: ControlSesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ControlSesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
