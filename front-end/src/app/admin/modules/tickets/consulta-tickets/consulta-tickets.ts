import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ModalService } from '../../../services/modal/modal';
import { MessagesService } from '../../../services/messages/messages';
import { TiketsService } from '../../../services/api/tickets/tikets';
import { AreasService } from '../../../services/api/areas/areas';
import { FormsModule } from '@angular/forms';
import { RegistrarTicket } from '../registrar-ticket/registrar-ticket';

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

	protected listaAreas: any[] = [];
	protected listaStatus: any[] = [];

	protected id_area: any = '';
	protected id_status: any = '';

	constructor(
		private modal: ModalService,
		private tickets: TiketsService,
		private areas: AreasService,
		private messages: MessagesService,
		private ch: ChangeDetectorRef
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
			pkArea: this.id_area,
			pkStatus: this.id_status
		};

		return this.tickets.obtenerListaGeneralTickets(data).toPromise().then(
			respuesta => {
				this.datosTabla = respuesta.tickets;
				this.ch.markForCheck();
			}
		)
	}

	protected cancelarTicket(id_ticket: number): void {
		this.messages.mensajeConfirmacionCustom(
			'¿Está seguro de continuar con la cancelación del ticket?',
			'question',
			'Cancelar ticket'
		).then(res => {

			if (!res.isConfirmed) return;

			this.messages.mensajeEsperar();

			this.tickets.cancelarTicket(id_ticket).subscribe({
				next: (respuesta: any) => {

					this.messages.mensajeGenerico(
						respuesta.mensaje, 'success', 'Cancelar ticket'
					);
					this.obtenerListaGeneralTickets();
				},

				error: (error) => {
					this.messages.mensajeGenerico(
						error?.error?.mensaje || 'Ocurrió un error al cancelar el ticket.',
						'error'
					);
				}
			});

		});
	}

	getStatusIcon(status: string): string {
		switch (status?.toLowerCase()) {
			case 'pendiente':
				return 'bi-hourglass-split text-warning';
			case 'en proceso':
				return 'bi-gear-fill text-primary';
			case 'en espera':
				return 'bi-pause-circle-fill text-secondary';
			case 'terminado':
				return 'bi-check-circle-fill text-success';
			case 'cancelado':
				return 'bi-x-circle-fill text-danger';
			default:
				return 'bi-question-circle text-dark';
		}
	}

	getStatusNombre(id: any): string {
		const s = this.listaStatus.find(x => x.id_status_ticket == id);
		return s ? s.status : '';
	}

	public abrirModalRegistrarTickets(pkTicket: number): void {
		const data: any = {
			pkTicket: pkTicket
		};

		this.modal.abrirModalConComponente(RegistrarTicket, data, 'lg-modal');
	}
	ngOnDestroy(): void {
		clearInterval(this.intervalo);
	}
}
