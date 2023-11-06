import { TestBed } from '@angular/core/testing';

import { AutoServicioService } from './auto-servicio.service';

describe('AutoServicioService', () => {
  let service: AutoServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
