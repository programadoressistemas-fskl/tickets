import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTickets } from './consulta-tickets';

describe('ConsultaTickets', () => {
  let component: ConsultaTickets;
  let fixture: ComponentFixture<ConsultaTickets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaTickets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaTickets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
