import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { TiposServicioService } from '../../../../services/api/tipos-servicio/tipos-servicio';
import { ModalService } from '../../../../services/modal/modal';
import { RegistrarTipoServicio } from '../registrar-tipo-servicio/registrar-tipo-servicio';
import { MessagesService } from '../../../../services/messages/messages';

@Component({
	selector: 'app-consulta-tipos-servicio',
	imports: [CommonModule],
	standalone: true,
	templateUrl: './consulta-tipos-servicio.html',
	styleUrl: './consulta-tipos-servicio.css',
})
export class ConsultaTiposServicio implements OnDestroy {
	protected datosTabla: any = [];

	private intervalo: any;

	constructor(
		private modal:         ModalService,
		private tiposServicio: TiposServicioService,
		private messages:      MessagesService,
		private ch:            ChangeDetectorRef
	) { }

	async ngOnInit(): Promise<any> {
		this.messages.mensajeEsperar();

		await this.obtenerListaTipoServicio();
		this.repetitiveInstruction();

		this.messages.cerrarMensajes();
	}

	private repetitiveInstruction(): void {
		this.intervalo = setInterval(() => {
			this.obtenerListaTipoServicio();
		}, 10000);
	}

	public async obtenerListaTipoServicio(): Promise<any> {
		return this.tiposServicio.obtenerListaTipoServicio().toPromise().then(
			respuesta => {
				this.datosTabla = respuesta.tiposServicio;
				this.ch.markForCheck();
			}
		);
	}

	protected cambiarStatustiposServicio(tipoServicio: any): void {
		this.messages.mensajeConfirmacionCustom(
			`¿Está seguro de ${tipoServicio.activo ? 'inactivar' : 'activar'} el tipo servicio?`,
			'question',
			`${tipoServicio.activo ? 'Inactivar' : 'Activar'} tipo servicio`
		).then(res => {
			if (!res.isConfirmed) return;

			this.messages.mensajeEsperar();

			this.tiposServicio.cambiarStatustiposServicio(tipoServicio.id_tipo_servicio)
				.subscribe(
					respuesta => {
						this.obtenerListaTipoServicio().then(() => {
							this.messages.mensajeGenerico(respuesta.mensaje, 'success', respuesta.title);
						});
					},
					error => {
						this.messages.mensajeGenerico('error', 'error');
					}
				);
		});
	}

	public abrirModalRegistrarTipoServicio(pkTipoServicio: number): void {
		const data: any = {
			pkTipoServicio: pkTipoServicio
		};

		this.modal.abrirModalConComponente(RegistrarTipoServicio, data, 'lg-modal')
	}

	ngOnDestroy(): void {
		clearInterval(this.intervalo);
	}
}