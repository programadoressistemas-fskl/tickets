import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/api/usuarios/usuarios';

@Component({
	selector: 'app-consulta-usuarios',
	imports: [CommonModule],
	standalone: true,
	templateUrl: './consulta-usuarios.html',
	styleUrl: './consulta-usuarios.css',
})
export class ConsultaUsuarios implements OnInit {
	protected datosTabla: any = [];

	constructor(
		private usuarios: UsuariosService,
		private ch: ChangeDetectorRef
	) { }

	ngOnInit(): void {
		this.obtenerListaUsuarios();
	}

	public async obtenerListaUsuarios(): Promise<any> {
		return this.usuarios.obtenerListaUsuarios().toPromise().then(
			respuesta => {
				console.log(respuesta.usuarios);
				this.datosTabla = respuesta.usuarios;
				this.ch.markForCheck();
			}
		);
	}
}