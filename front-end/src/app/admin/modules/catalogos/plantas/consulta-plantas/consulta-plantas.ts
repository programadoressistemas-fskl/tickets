import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { PlantasService } from '../../../../services/api/plantas/plantas';
import { ModalService } from '../../../../services/modal/modal';
import { RegistrarPlanta } from '../registrar-planta/registrar-planta';
import { MessagesService } from '../../../../services/messages/messages';

@Component({
	selector: 'app-consulta-plantas',
	imports: [CommonModule],
	standalone: true,
	templateUrl: './consulta-plantas.html',
	styleUrl: './consulta-plantas.css',
})
export class ConsultaPlantas implements OnDestroy {
	protected datosTabla: any = [];

	private intervalo: any;

	constructor(
		private modal: ModalService,
		private plantas: PlantasService,
		private messages: MessagesService,
		private ch: ChangeDetectorRef
	) { }

	async ngOnInit(): Promise<any> {
		this.messages.mensajeEsperar();

		await this.obtnerListaPlantas();
		this.repetitiveInstruction();

		this.messages.cerrarMensajes();
	}

	private repetitiveInstruction(): void {
		this.intervalo = setInterval(() => {
			this.obtnerListaPlantas();
		}, 10000);
	}

	public async obtnerListaPlantas(): Promise<any> {
		return this.plantas.obtenerListaPlantas().toPromise().then(
			respuesta => {
				this.datosTabla = respuesta.plantas;
				this.ch.markForCheck();
			}
		)
	}

	protected cambiarStatusPlanta(planta: any): void {
		this.messages.mensajeConfirmacionCustom(
			`¿Está seguro de ${planta.activo ? 'inactivar' : 'activar'} la planta?`,
			'question',
			`${planta.activo ? 'Inactivar' : 'Activar'} planta`
		).then(res => {
			if (!res.isConfirmed)return;

			this.messages.mensajeEsperar(); 

			this.plantas.cambiarStatusPlanta(planta.id_planta).subscribe(
				respuesta => {
					this.obtnerListaPlantas().then(() => {
						this.messages.mensajeGenerico(respuesta.mensaje, 'success', respuesta.title);
					});
				}, error => {
					this.messages.mensajeGenerico('error', 'error');
				}
			)
		})
	}

	public abrirModalRegistrarPlanta(pkPlanta: number): void {
		const data: any = {
			pkPlanta: pkPlanta
		};

		this.modal.abrirModalConComponente(RegistrarPlanta, data, 'lg-modal')
	}

	ngOnDestroy(): void {
		clearInterval(this.intervalo);
	}
}
