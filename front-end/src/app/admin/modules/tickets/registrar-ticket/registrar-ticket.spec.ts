import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTicket } from './registrar-ticket';

describe('RegistrarTicket', () => {
  let component: RegistrarTicket;
  let fixture: ComponentFixture<RegistrarTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarTicket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
