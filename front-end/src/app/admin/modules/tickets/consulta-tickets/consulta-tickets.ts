import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ModalService } from '../../../services/modal/modal';
import { MessagesService } from '../../../services/messages/messages';
import { TiketsService } from '../../../services/api/tickets/tikets';
import { AreasService } from '../../../services/api/areas/areas';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-consulta-tickets',
	imports: [CommonModule, FormsModule],
	standalone: true,
	templateUrl: './consulta-tickets.html',
	styleUrl: './consulta-tickets.css',
})
export class ConsultaTickets implements OnDestroy {
	protected datosTabla: any = [];

	private intervalo: any;

	protected listaAreas:  any[] = [];
	protected listaStatus: any[] = [];

	protected id_area:   any = '';
	protected id_status: any = '';

	constructor(
		private modal:    ModalService,
		private tickets:  TiketsService,
		private areas:    AreasService,
		private messages: MessagesService,
		private ch: 	  ChangeDetectorRef
	) { }

	async ngOnInit(): Promise<any> {
		this.messages.mensajeEsperar();

		await this.obtenerListaAreas();
		await this.obtenerStatusTickets();

		this.messages.cerrarMensajes();
	}

	private repetitiveInstruction(): void {
		this.intervalo = setInterval(() => {
			if (this.id_area == '' || this.id_status == '') {
				this.datosTabla = [];
				return;
			}

			if (navigator.onLine) this.obtenerListaGeneralTickets();
		}, 10000);
	}

	private async obtenerStatusTickets(): Promise<any> {
		return this.tickets.obtenerStatusTickets().toPromise().then(
			respuesta => {
				this.listaStatus = respuesta.tickets;
				this.ch.markForCheck();
			}
		);
	}

	private async obtenerListaAreas(): Promise<any> {
		return this.areas.obtenerListaAreas().toPromise().then(
			respuesta => {
				this.listaAreas = respuesta.areas;
				this.ch.markForCheck();
			}
		)
	}

	protected async busquedaFiltros(): Promise<any> {
		clearInterval(this.intervalo);

		if (this.id_area == '' || this.id_status == '') return;

		this.messages.mensajeEsperar();
		await this.obtenerListaGeneralTickets().then(() => {
			this.messages.cerrarMensajes();
			this.repetitiveInstruction();
		});
	}

	protected async obtenerListaGeneralTickets(): Promise<any> {
		const data: any = {
			pkArea:   this.id_area,
			pkStatus: this.id_status
		};

		return this.tickets.obtenerListaGeneralTickets(data).toPromise().then(
			respuesta => { 
				this.datosTabla = respuesta.tickets;
				this.ch.markForCheck();
			}
		)
	}

	ngOnDestroy(): void {
		(this.intervalo);
	}
}
