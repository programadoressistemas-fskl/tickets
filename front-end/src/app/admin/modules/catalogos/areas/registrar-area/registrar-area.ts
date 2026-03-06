import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal/modal';
import { MessagesService } from '../../../../services/messages/messages';
import { AreasService } from '../../../../services/api/areas/areas';

@Component({
	selector: 'app-registrar-area',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './registrar-area.html',
	styleUrl: './registrar-area.css',
})
export class RegistrarArea implements OnInit {
	@Input() pkArea: any = null;

	protected formArea!: FormGroup;

	constructor(
		private modal: ModalService,
		private ch: ChangeDetectorRef,
		private fb: FormBuilder,
		private messages: MessagesService,
		private areas: AreasService
	) { }

	async ngOnInit(): Promise<any> {
		this.messages.mensajeEsperar();

		this.crearFormAreas();

		if (this.pkArea != null) await this.obtenerDetalleArea(this.pkArea);

		this.messages.cerrarMensajes();
	}

	protected crearFormAreas(): void {
		this.formArea = this.fb.group({
			area: [null, [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]
			]
		});
	}

	public async obtenerDetalleArea(PkArea: number): Promise<any> {

		return this.areas.obtenerDetalleArea(PkArea).toPromise().then(
			respuesta => {

				const area = respuesta.area;

				this.formArea.get('area')?.setValue(area.area);

			}
		);

	}

	protected registrarArea(): void {

		if (this.formArea.invalid) {
			this.messages.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura correcta.',
				'info', 'Los campos requeridos están marcados con un *'
			);
			return;
		}

		this.messages
			.mensajeConfirmacionCustom('¿Está seguro de continuar con el registro del área?',
				'question', 'Registrar área'
			).then(res => {

				if (!res.isConfirmed) return;
				this.messages.mensajeEsperar();

				const area: any = this.formArea.value;

				this.areas.registrarArea(area).toPromise().then(
					respuesta => {

						this.pkArea = respuesta.pkArea;
						this.ch.markForCheck();

						this.obtenerDetalleArea(respuesta.pkArea).then(() => {
							this.messages.mensajeGenerico(respuesta.mensaje, 'success', respuesta.title);
						});

					}, error => {
						this.messages.mensajeGenerico('error', 'error');
					}
				);
			});
	}

	get cambiosForm(): boolean {
		return this.formArea.dirty;
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
				if(!res.isConfirmed) return; 

				this.modal.cerrarModal();
			}
		)
	}
}