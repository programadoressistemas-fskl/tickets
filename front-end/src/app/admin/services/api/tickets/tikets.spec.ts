import { TestBed } from '@angular/core/testing';

import { Tikets } from './tikets';

describe('Tikets', () => {
  let service: Tikets;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tikets);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
