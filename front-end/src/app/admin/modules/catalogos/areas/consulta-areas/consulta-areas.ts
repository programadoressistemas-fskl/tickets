import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { AreasService } from '../../../../services/api/areas/areas';
import { ModalService } from '../../../../services/modal/modal';
import { RegistrarArea } from '../registrar-area/registrar-area';
import { MessagesService } from '../../../../services/messages/messages';

@Component({
	selector: 'app-consulta-areas',
	imports: [CommonModule],
	standalone: true,
	templateUrl: './consulta-areas.html',
	styleUrl: './consulta-areas.css',
})
export class ConsultaAreas implements OnDestroy {
	protected datosTabla: any = [];

	private intervalo: any;

	constructor(
		private modal: ModalService,
		private areas: AreasService,
		private messages: MessagesService,
		private ch: ChangeDetectorRef
	) { }

	async ngOnInit(): Promise<any> {
		this.messages.mensajeEsperar();

		await this.obtenerListaAreas();
		this.repetitiveInstruction();

		this.messages.cerrarMensajes();
	}

	public repetitiveInstruction(): void {
		this.intervalo = setInterval(() => {
			this.obtenerListaAreas();
		}, 10000);
	}

	public async obtenerListaAreas(): Promise<any> {
		return this.areas.obtenerListaAreas().toPromise().then(
			respuesta => {
				this.datosTabla = respuesta.areas;
				this.ch.markForCheck();
			}
		)
	}

	public abrirModalRegistrarArea($pkArea: number): void {
		const data: any = {
			pkArea: $pkArea
		};

		this.modal.abrirModalConComponente(RegistrarArea, data, 'lg-modal');
	}

	ngOnDestroy(): void {
		clearInterval(this.intervalo);
	}
}