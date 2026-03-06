import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal/modal';
import { TiposServicioService } from '../../../../services/api/tipos-servicio/tipos-servicio';
import { MessagesService } from '../../../../services/messages/messages';

@Component({
	selector: 'app-registrar-tipo-servicio',
	imports: [CommonModule, ReactiveFormsModule],
	standalone: true,
	templateUrl: './registrar-tipo-servicio.html',
	styleUrl: './registrar-tipo-servicio.css',
})
export class RegistrarTipoServicio {
	@Input() pkTipoServicio: any = null;

	protected formTipoServicio!: FormGroup;

	constructor(
		private modal: ModalService,
		private tiposServicio: TiposServicioService,
		private fb: FormBuilder,
		private ch: ChangeDetectorRef,
		private messages: MessagesService
	) { }

	async ngOnInit(): Promise<any> {
		this.messages.mensajeEsperar();

		this.crearFormTipoServicio();
		if (this.pkTipoServicio != null) await this.obtenerDetalleTipoServicio(this.pkTipoServicio);

		this.messages.cerrarMensajes();
	}

	private crearFormTipoServicio(): void {
		this.formTipoServicio = this.fb.group({
			tipo_servicio: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
			descripcion: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]]
		})
	}


	public async obtenerDetalleTipoServicio(pkTipoServicio: number): Promise<any> {
		return this.tiposServicio.obtenerDetalleTipoServicio(pkTipoServicio).toPromise().then(
			respuesta => {
				const tipoServicio = respuesta.tipoServicio;

				this.formTipoServicio.get('tipo_servicio')?.setValue(tipoServicio.tipo_servicio);
				this.formTipoServicio.get('descripcion')?.setValue(tipoServicio.descripcion);
			}
		)
	}

	protected registrarTipoServicio(): void {
		if (this.formTipoServicio.invalid) {
			this.messages.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura correcta.', 'info', 'Los campos requeridos están marcados con un *');
			return;
		}

		this.messages.mensajeConfirmacionCustom('¿Está seguro de continuar con el registro del tipo servicio?',
			'question', 'Registrar tipo servicio').then(
				res => {
					if (!res.isConfirmed) return;
					this.messages.mensajeEsperar();

					const tiposServicio: any = this.formTipoServicio.value;

					this.tiposServicio.registrarTipoServicio(tiposServicio).toPromise().then(
						respuesta => {

							this.pkTipoServicio = respuesta.pkTipoServicio;
							this.ch.markForCheck();

							this.messages.mensajeGenerico(respuesta.mensaje, 'success', respuesta.title);
						}, error => {
							this.messages.mensajeGenerico('error', 'error');
						}
					);
				});
	}

	protected actualizarTipoServicio(): void {
		if (this.formTipoServicio.invalid) {
			this.messages.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura correcta.', 'info', 'Los campos requeridos están marcados con un *');
			return;
		}

		this.messages.mensajeConfirmacionCustom('¿Está seguro de continuar con el registro de tipo Servicio?',
			'question', 'Actualizar tipo Servicio').then(
				res => {
					if (!res.isConfirmed) return;

					this.messages.mensajeEsperar();

					const data: any = {
						pkTipoServicio: this.pkTipoServicio,
						tiposServicio: this.formTipoServicio.value
					};

					this.tiposServicio.actualizarTipoServicio(data).toPromise().then(
						respuesta => {
							this.obtenerDetalleTipoServicio(this.pkTipoServicio).then(() => {
								this.messages.mensajeGenerico(respuesta.mensaje, 'success', respuesta.title)
							});
						}, error => {
							this.messages.mensajeGenerico('error', 'error');
						}
					)
				}
			)
	}

	get cambiosForm(): boolean {
		return this.formTipoServicio.dirty;
	}

	public cerrarModal(): void {
		if (!this.cambiosForm) {
			this.modal.cerrarModal();
			return;
		}

		this.messages.mensajeConfirmacionCustom(
			'¿Está seguro de cerrar sin guardar cambios?',
			'question',
			'Cancelar registro'
		).then(
			res => {
				if (!res.isConfirmed) return;

				this.modal.cerrarModal();
			}
		)
	}

}
