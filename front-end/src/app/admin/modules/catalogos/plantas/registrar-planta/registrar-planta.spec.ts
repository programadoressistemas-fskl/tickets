import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPlanta } from './registrar-planta';

describe('RegistrarPlanta', () => {
  let component: RegistrarPlanta;
  let fixture: ComponentFixture<RegistrarPlanta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarPlanta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPlanta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
