import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../services/modal/modal';
import { MessagesService } from '../../../services/messages/messages';
import { TiketsService } from '../../../services/api/tickets/tikets';

@Component({
	selector: 'app-registrar-ticket',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './registrar-ticket.html',
	styleUrl: './registrar-ticket.css',
})
export class RegistrarTicket implements OnInit {
	@Input() pkTicket: any = null;


	protected formTicket!: FormGroup;

	protected listaAreas: any[] = [];
	protected listaPlantas: any[] = [];
	protected listaTurnos: any[] = [];
	protected listatiposServicio: any[] = [];

	images: any[] = [];
	files: File[] = [];

	constructor(
		private modal: ModalService,
		private messages: MessagesService,
		private tickets: TiketsService,
		private ch: ChangeDetectorRef,
		private fb: FormBuilder
	) { }

	async ngOnInit(): Promise<void> {
		this.messages.mensajeEsperar();

		this.crearFormTicket();
		await this.obtenerRecursosRegistroTicket();

		if (this.pkTicket != null) await this.obtenerDetalleTicket(this.pkTicket);

		this.messages.cerrarMensajes();
	}

	private crearFormTicket(): void {
		this.formTicket = this.fb.group({
			id_area: ['', Validators.required],
			id_planta: ['', Validators.required],
			id_turno: ['', Validators.required],
			id_tipo_servicio: ['', Validators.required],
			descripcion_problema: [null, [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]]
		});
	}

	public async obtenerDetalleTicket(pkTicket: number): Promise<void> {
		return this.tickets.obtenerDetalleTicket(pkTicket).toPromise().then(
			respuesta => {
				const ticket = respuesta.ticket;
				const evidencias = respuesta.evidencias || [];

				this.formTicket.get('id_area')?.setValue(ticket.id_area);
				this.formTicket.get('id_planta')?.setValue(ticket.id_planta);
				this.formTicket.get('id_turno')?.setValue(ticket.id_turno);
				this.formTicket.get('id_tipo_servicio')?.setValue(ticket.id_tipo_servicio);
				this.formTicket.get('descripcion_problema')?.setValue(ticket.descripcion_problema);

				this.images = evidencias;
				this.ch.detectChanges();
			}, error => {
				this.messages.mensajeGenerico('error', 'error');
			}
		);
	}

	private async obtenerRecursosRegistroTicket(): Promise<void> {
		try {
			const respuesta: any = await this.tickets.obtenerRecursosRegistroTicket().toPromise();

			this.listaAreas = respuesta.recursos.listaareas;
			this.listaPlantas = respuesta.recursos.listaplantas;
			this.listaTurnos = respuesta.recursos.listaturnos;
			this.listatiposServicio = respuesta.recursos.listatiposServicio;

			this.ch.detectChanges();
		} catch (error) {
			this.messages.mensajeGenerico('error', 'error');
		}
	}

	mostrarEvidencia: boolean = false;
	imagenesEvidencia: string[] = [];


	protected onFileSelected(event: any): void {
		const selectedFiles = event.target.files;

		for (let file of selectedFiles) {
			if (!file.type.startsWith('image/')) continue;

			this.files.push(file);

			const reader = new FileReader();
			reader.onload = (e: any) => {
				this.images.push({
					id_ticket_evidencia: 0,
					url_evidencia: e.target.result
				});
				this.ch.detectChanges();
			};

			reader.readAsDataURL(file);
		}

		event.target.value = '';
	}

	protected eliminarEvidenciaTicket(index: number, id_ticket_evidencia: number): void {
		this.messages.mensajeConfirmacionCustom(
			'¿Está seguro de eliminar la evidencia del ticket?',
			'question',
			'Eliminar evidencia'
		).then(
			res => {
				if (!res.isConfirmed) return;

				this.messages.mensajeEsperar();
				this.tickets.eliminarEvidenciaTicket(id_ticket_evidencia).toPromise().then(
					respuesta => {
						this.obtenerDetalleTicket(respuesta.pkTicket).then(() => {
							this.images.splice(index, 1);
							this.files.splice(index, 1);
							this.ch.detectChanges();
	
							this.messages.cerrarMensajes();
						});
					}, error => {
						this.messages.mensajeGenerico('error', 'error');
					}
				);
			}
		);
	}

	protected registrarTicket(): void {

		if (!this.pkTicket && this.formTicket.invalid) {
			this.messages.mensajeGenerico('Aún hay campos vacíos o inválidos.', 'info', 'Campos requeridos');
			return;
		}

		this.messages.mensajeConfirmacionCustom('¿Está seguro de registrar el ticket con evidencias?',
			'question', 'Registrar ticket').then(
				res => {

					if (!res.isConfirmed) return;

					this.messages.mensajeEsperar();

					const formData = new FormData();

					Object.keys(this.formTicket.value).forEach(key => {
						formData.append(key, this.formTicket.value[key]);
					});

					this.files.forEach(file => {
						formData.append('images[]', file);
					});

					this.tickets.registrarTicket(formData).toPromise().then(
						(respuesta: any) => {

							this.obtenerDetalleTicket(respuesta.pkTicket).then(() => {
								this.messages.mensajeGenerico(respuesta.mensaje, 'success', respuesta.title);
							})
							this.messages.mensajeGenerico(respuesta.mensaje, 'success', respuesta.title);

							this.modal.cerrarModal();

						},
						error => {
							this.messages.mensajeGenerico('error', 'error');
						}
					);
				});
	}

	protected actualizarTicket(): void {

		if (this.formTicket.invalid) {
			this.messages.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura correcta.',
				'info', 'Los campos requeridos están marcados con un *'
			);
			return;
		}

		this.messages.mensajeConfirmacionCustom('¿Está seguro de continuar con la actualización del ticket?',
			'question', 'Actualizar ticket').then(
				res => {

					if (!res.isConfirmed) return;

					this.messages.mensajeEsperar();

					const formData = new FormData();

					Object.keys(this.formTicket.value).forEach(key => {
						formData.append(key, this.formTicket.value[key]);
					});

					formData.append('pkTicket', String(this.pkTicket));

					if (this.files && this.files.length > 0) {
						this.files.forEach(file => {
							formData.append('images[]', file);
						});
					}

					this.tickets.actualizarTicket(formData).subscribe({
						next: (respuesta: any) => {
							const id = respuesta?.pkTicket || this.pkTicket;
							if (!id) {
								this.messages.mensajeGenerico(
									'No se pudo obtener el ID del ticket.',
									'error'
								);
								return;
							}

							this.obtenerDetalleTicket(id).then(() => {
								this.messages.mensajeGenerico(
									respuesta.mensajes,
									'success',
									respuesta.title
								);
							});

						},

						error: (error) => {
							this.messages.mensajeGenerico(
								'Ocurrió un error al actualizar el ticket.',
								'error'
							);
						}

					});

				});
	}

	get cambiosForm(): boolean {
		return this.formTicket.dirty || this.images.length > 0;
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
		).then(res => {
			if (!res.isConfirmed) return;
			this.modal.cerrarModal();
		});
	}
}