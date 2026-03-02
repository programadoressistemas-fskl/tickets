import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTipoServicio } from './registrar-tipo-servicio';

describe('RegistrarTipoServicio', () => {
  let component: RegistrarTipoServicio;
  let fixture: ComponentFixture<RegistrarTipoServicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarTipoServicio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarTipoServicio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
