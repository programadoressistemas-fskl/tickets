import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AreasService } from '../../../../services/api/areas/areas';

@Component({
  selector: 'app-consulta-areas', 
  imports: [CommonModule],
  standalone: true,
  templateUrl: './consulta-areas.html',
  styleUrl: './consulta-areas.css',
})
export class ConsultaAreas {
  protected datosTabla: any = [];

  constructor(
    private areas: AreasService,
    private ch: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtenerListaAreas();
  }

  public async obtenerListaAreas(): Promise<any>{
    return this.areas.obtenerListaAreas().toPromise().then(
      respuesta => {
        console.log(respuesta.areas);
        this.datosTabla = respuesta.areas;
        this.ch.markForCheck();
      }
    ) 
  }
}