import { TestBed } from '@angular/core/testing';

import { TiposServicio } from './tipos-servicio';

describe('TiposServicio', () => {
  let service: TiposServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
