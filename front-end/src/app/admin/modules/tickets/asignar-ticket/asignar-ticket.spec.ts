import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarTicket } from './asignar-ticket';

describe('AsignarTicket', () => {
  let component: AsignarTicket;
  let fixture: ComponentFixture<AsignarTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarTicket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
