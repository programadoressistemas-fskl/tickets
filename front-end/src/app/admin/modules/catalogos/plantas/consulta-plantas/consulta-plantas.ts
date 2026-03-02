import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PlantasService } from '../../../../services/api/plantas/plantas';

@Component({
	selector: 'app-consulta-plantas',
	imports: [CommonModule],
	standalone: true,
	templateUrl: './consulta-plantas.html',
	styleUrl: './consulta-plantas.css',
})
export class ConsultaPlantas implements OnInit {
	protected datosTabla: any = [];
	
	constructor(
		private plantas: PlantasService,
		private ch: ChangeDetectorRef
	) { }

	ngOnInit(): void {
		this.obtnerListaPlantas();
	}

	public async obtnerListaPlantas(): Promise<any> {
		return this.plantas.obtenerListaPlantas().toPromise().then(
			respuesta => {
				this.datosTabla = respuesta.plantas;
				this.ch.markForCheck();
			}
		)
	}
}
