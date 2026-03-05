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
