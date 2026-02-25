import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-consulta-plantas',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './consulta-plantas.html',
  styleUrl: './consulta-plantas.css',
})
export class ConsultaPlantas {
  protected datosTabla = [
    {
      planta: 'kahjds',
      abrev: 'hjahds',
      direccion: 'san matracas',
      activo: '1'
    }
  ]
}
