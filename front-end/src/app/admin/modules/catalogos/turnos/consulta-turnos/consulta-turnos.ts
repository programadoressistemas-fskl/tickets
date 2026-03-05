import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { TurnosService } from '../../../../services/api/turnos/turnos';
import { ModalService } from '../../../../services/modal/modal';
import { RegistrarTurno } from '../registrar-turno/registrar-turno';
import { MessagesService } from '../../../../services/messages/messages';

@Component({
	selector: 'app-consulta-turnos',
	imports: [CommonModule],
	standalone: true,
	templateUrl: './consulta-turnos.html',
	styleUrl: './consulta-turnos.css',
})
export class ConsultaTurnos implements OnDestroy {
	protected datosTabla: any = [];

	private intervalo: any;

	constructor(
		private modal: ModalService,
		private turnos: TurnosService,
		private messages: MessagesService,
		private ch: ChangeDetectorRef
	) { }

	async ngOnInit(): Promise<any> {
		this.messages.mensajeEsperar();

		await this.obtenerListaTurnos();
		this.repetitiveInstruction();

		this.messages.cerrarMensajes();
	}

	private repetitiveInstruction(): void {
		this.intervalo = setInterval(() => {
			this.obtenerListaTurnos();
		}, 10000);
	}

	public async obtenerListaTurnos(): Promise<any> {
		return this.turnos.obtenerListaTurnos().toPromise().then(
			respuesta => {
				this.datosTabla = respuesta.turnos;
				this.ch.markForCheck();
			}
		)
	}

	public abrirModalRegistrarTurno(pkTurno: number): void {
		const data: any = {
			pkTurno: pkTurno
		};

		this.modal.abrirModalConComponente(RegistrarTurno, data, 'md-modal')
	}

	ngOnDestroy(): void {
		clearInterval(this.intervalo);
	}
}
