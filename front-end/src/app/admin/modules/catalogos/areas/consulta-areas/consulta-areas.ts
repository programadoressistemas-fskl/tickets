import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-consulta-areas',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './consulta-areas.html',
  styleUrl: './consulta-areas.css',
})
export class ConsultaAreas {
  protected datosTabla = [
    {
      area: 'Faske', 
      activo: '1'
    }
  ]
}
