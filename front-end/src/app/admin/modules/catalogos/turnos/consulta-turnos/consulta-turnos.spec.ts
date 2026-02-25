import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTurnos } from './consulta-turnos';

describe('ConsultaTurnos', () => {
  let component: ConsultaTurnos;
  let fixture: ComponentFixture<ConsultaTurnos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaTurnos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaTurnos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
