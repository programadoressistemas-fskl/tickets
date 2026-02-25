import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPlantas } from './consulta-plantas';

describe('ConsultaPlantas', () => {
  let component: ConsultaPlantas;
  let fixture: ComponentFixture<ConsultaPlantas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaPlantas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaPlantas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
