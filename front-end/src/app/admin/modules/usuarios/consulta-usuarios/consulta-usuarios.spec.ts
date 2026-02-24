import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaUsuarios } from './consulta-usuarios';

describe('ConsultaUsuarios', () => {
  let component: ConsultaUsuarios;
  let fixture: ComponentFixture<ConsultaUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaUsuarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaUsuarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
