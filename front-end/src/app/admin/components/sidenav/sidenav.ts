import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal/modal';
import { RegistrarUsuario } from '../../modules/usuarios/registrar-usuario/registrar-usuario';
import { RegistrarArea } from '../../modules/catalogos/areas/registrar-area/registrar-area';
import { RegistrarPlanta } from '../../modules/catalogos/plantas/registrar-planta/registrar-planta';
import { RegistrarTipoServicio } from '../../modules/catalogos/tipo-servicio/registrar-tipo-servicio/registrar-tipo-servicio';

@Component({
	selector: 'app-sidenav',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './sidenav.html',
	styleUrl: './sidenav.css',
})
export class Sidenav {
	constructor (
		private modal: ModalService
	) {}

	public abrirModalRegistrarUsuario(): void {
		this.modal.abrirModalConComponente(RegistrarUsuario, {}, 'lg-modal');
	} 

	public abrirModalRegistroArea(): void {
		this.modal.abrirModalConComponente(RegistrarArea, {}, 'lg-modal');
	} 

	public abrirModalRegistroPlanta(): void {
		this.modal.abrirModalConComponente(RegistrarPlanta, {}, 'lg-modal')
	} 

	public abrirModalRegistroTipoServicio(): void {
		this.modal.abrirModalConComponente(RegistrarTipoServicio, {}, 'lg-modal')
	}
}