import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PlantasService } from '../../../../services/api/plantas/plantas';
import { ModalService } from '../../../../services/modal/modal';
import { RegistrarPlanta } from '../registrar-planta/registrar-planta';

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
		private modal: ModalService,
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

	public abrirModalRegistrarPlanta(): void {
		this.modal.abrirModalConComponente(RegistrarPlanta, {}, 'lg-modal')
	}
}
