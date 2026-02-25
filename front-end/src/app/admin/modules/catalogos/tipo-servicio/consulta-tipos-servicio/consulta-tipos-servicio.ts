import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-consulta-tipos-servicio',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './consulta-tipos-servicio.html',
  styleUrl: './consulta-tipos-servicio.css',
})
export class ConsultaTiposServicio {
  protected datosTabla = [
    {
      tipo_servicio: 'Internet',
      activo: '1'
    }
  ]

}
