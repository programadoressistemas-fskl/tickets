import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal/modal';

@Component({
	selector: 'app-registrar-usuario',
	imports: [],
	templateUrl: './registrar-usuario.html',
	styleUrl: './registrar-usuario.css',
})
export class RegistrarUsuario {
	constructor(
		private modal: ModalService
	) { }

	public cerrarModal(): void {
		this.modal.cerrarModal();
	}
}