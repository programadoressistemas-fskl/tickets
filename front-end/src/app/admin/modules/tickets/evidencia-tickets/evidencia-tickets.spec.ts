import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenciaTickets } from './evidencia-tickets';

describe('EvidenciaTickets', () => {
  let component: EvidenciaTickets;
  let fixture: ComponentFixture<EvidenciaTickets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvidenciaTickets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidenciaTickets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
