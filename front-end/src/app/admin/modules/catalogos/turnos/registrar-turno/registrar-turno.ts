import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal/modal';
import { MessagesService } from '../../../../services/messages/messages';
import { TurnosService } from '../../../../services/api/turnos/turnos';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-registrar-turno',
	imports: [CommonModule, ReactiveFormsModule],
	standalone: true,
	templateUrl: './registrar-turno.html',
	styleUrl: './registrar-turno.css',
})
export class RegistrarTurno {
	@Input() pkTurno: any = null;

	protected formTurno!: FormGroup;

	protected listaAreas: any[] = [];

	constructor(
		private modal: ModalService,
		private fb: FormBuilder,
		private ch: ChangeDetectorRef,
		private messages: MessagesService,
		private turnos: TurnosService
	) { }

	async ngOnInit(): Promise<any> {
		this.messages.mensajeEsperar();

		this.crearFormTurno();
		if (this.pkTurno != null) await this.obtenerDetalleTurno(this.pkTurno);

		this.messages.cerrarMensajes();
	}

	private crearFormTurno(): void {
		this.formTurno = this.fb.group({
			turno: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
		});
	}

	public async obtenerDetalleTurno(pkTurno: number): Promise<any> {
		return this.turnos.obtenerDetalleTurno(pkTurno).toPromise().then(
			respuesta => {
				const turno = respuesta.turno;

				this.formTurno.get('turno')?.setValue(turno.turno);
			}
		)
	}

	protected registrarTurno(): void {
		if (this.formTurno.invalid) {
			this.messages.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura correcta.', 'info', 'Los campos requeridos están marcados con un *');
			return;
		}

		this.messages.mensajeConfirmacionCustom('¿Está seguro de continuar con el registro del turno?',
			'question', 'Registrar turno').then(
				res => {
					if (!res.isConfirmed) return;
					this.messages.mensajeEsperar();

					const turno: any = this.formTurno.value;

					this.turnos.registrarTurno(turno).toPromise().then(
						respuesta => {
							this.pkTurno = respuesta.pkTurno;
							this.ch.markForCheck();

							this.obtenerDetalleTurno(respuesta.pkTurno).then(() => {
								this.messages.mensajeGenerico(respuesta.mensaje, 'success', respuesta.title);
							})
						}, error => {
							this.messages.mensajeGenerico('error', 'error');
						}
					);
				}
			)
	}

	protected actualizarTurno(): void {
		if (this.formTurno.invalid) {
			this.messages.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura correcta.', 'info', 'Los campos requeridos están marcados con un *');
			return;
		}

		this.messages.mensajeConfirmacionCustom('¿Está seguro de continuar con la actualización del turno?',
			'question', 'Actualizar turno').then(
				res => {
					if (!res.isConfirmed) return;

					this.messages.mensajeEsperar();

					const data: any = {
						pkTurno: this.pkTurno,
						turno: this.formTurno.value
					}; 

					this.turnos.actualizarTurno(data).toPromise().then(
						respuesta => {
							this.obtenerDetalleTurno(this.pkTurno).then(() => {
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
		return this.formTurno.dirty;
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
