import { Component } from '@angular/core';
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
	protected formTurno!: FormGroup;

	protected listaAreas: any[] = [];

	constructor(
		private modal: ModalService,
		private fb: FormBuilder,
		private messages: MessagesService,
		private turnos: TurnosService
	) { }

	ngOnInit(): void {
		this.crearFormTurno();
	}

	private crearFormTurno(): void {
		this.formTurno = this.fb.group({
			turno: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
		});
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

					const turno: any = this.formTurno.value;

					this.turnos.registrarTurno(turno).toPromise().then(
						respuesta => {
							this.messages.mensajeGenerico(respuesta.mensaje, 'success', respuesta.title);
						}, error => {
							this.messages.mensajeGenerico('error', 'error');
						}
					);
				}
			)
	}

	public cerrarModal(): void {
		this.modal.cerrarModal();
	}
}
