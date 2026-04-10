import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTicketsDepartamento } from './consulta-tickets-departamento';

describe('ConsultaTicketsDepartamento', () => {
  let component: ConsultaTicketsDepartamento;
  let fixture: ComponentFixture<ConsultaTicketsDepartamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaTicketsDepartamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaTicketsDepartamento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
