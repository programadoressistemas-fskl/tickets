import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-consulta-turnos',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './consulta-turnos.html',
  styleUrl: './consulta-turnos.css',
})
export class ConsultaTurnos {
  protected datosTabla = [
    {
      turno: 'vespertino',
      activo: '1'
    }
  ]
}
