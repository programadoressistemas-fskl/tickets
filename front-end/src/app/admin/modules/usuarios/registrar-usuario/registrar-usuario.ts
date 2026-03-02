import { ChangeDetectorRef, Component } from '@angular/core';
import { ModalService } from '../../../services/modal/modal';
import { CommonModule } from '@angular/common';
import { AreasService } from '../../../services/api/areas/areas';

@Component({
	selector: 'app-registrar-usuario',
	imports: [CommonModule],
	standalone: true,
	templateUrl: './registrar-usuario.html',
	styleUrl: './registrar-usuario.css',
})
export class RegistrarUsuario {
	protected listaAreas: any[] = [];

	constructor(
		private modal: ModalService,
		private areas: AreasService,
		private ch: ChangeDetectorRef
	) { }

	ngOnInit(): void {
		this.obtenerListaAreas();
	}

	public async obtenerListaAreas(): Promise<any> {
		return this.areas.obtenerListaAreas().toPromise().then(
			respuesta => {
				this.listaAreas = respuesta.areas;
				this.ch.markForCheck();
			} 
		)
	}

	public cerrarModal(): void {
		this.modal.cerrarModal();
	} 


}