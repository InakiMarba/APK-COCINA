import { TestBed } from '@angular/core/testing';

import { MisdatosService } from './misdatos.service';

describe('MisdatosService', () => {
  let service: MisdatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisdatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
