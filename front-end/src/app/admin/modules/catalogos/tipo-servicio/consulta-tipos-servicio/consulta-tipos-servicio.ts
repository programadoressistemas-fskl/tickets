import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { TiposServicioService } from '../../../../services/api/tipos-servicio/tipos-servicio';

@Component({
  selector: 'app-consulta-tipos-servicio',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './consulta-tipos-servicio.html',
  styleUrl: './consulta-tipos-servicio.css',
})
export class ConsultaTiposServicio {
  protected datosTabla: any = [];
  constructor(
    private tiposServicio: TiposServicioService,
    private ch: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtenerListaTipoServicio();
  }

  public async obtenerListaTipoServicio(): Promise<any> {
    return this.tiposServicio.obtenerListaTipoServicio().toPromise().then(
      respuesta => {
        this.datosTabla = respuesta.tiposServicio;
        this.ch.markForCheck();
      }
    )
  }

}
