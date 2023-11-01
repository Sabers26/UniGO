import { TestBed } from '@angular/core/testing';

import { AutenticacionStorageService } from './autenticacion-storage.service';

describe('AutenticacionStorageService', () => {
  let service: AutenticacionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
