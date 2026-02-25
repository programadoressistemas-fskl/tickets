import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTiposServicio } from './consulta-tipos-servicio';

describe('ConsultaTiposServicio', () => {
  let component: ConsultaTiposServicio;
  let fixture: ComponentFixture<ConsultaTiposServicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaTiposServicio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaTiposServicio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
