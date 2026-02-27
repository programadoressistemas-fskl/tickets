import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TurnosService } from '../../../../services/api/turnos/turnos';

@Component({
	selector: 'app-consulta-turnos',
	imports: [CommonModule],
	standalone: true,
	templateUrl: './consulta-turnos.html',
	styleUrl: './consulta-turnos.css',
})
export class ConsultaTurnos implements OnInit {
	protected datosTabla: any = []

	constructor(
		private turnos: TurnosService,
		private ch: ChangeDetectorRef
	) { }

	ngOnInit(): void {
		this.obtenerListaTurnos();
	}

	public async obtenerListaTurnos(): Promise<any> {
		return this.turnos.obtenerListaTurnos().toPromise().then(
			respuesta => {
				this.datosTabla = respuesta.turnos;
				this.ch.markForCheck();
			}
		)
	}
}
