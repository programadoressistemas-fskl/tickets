import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/api/usuarios/usuarios';
import { ModalService } from '../../../services/modal/modal';
import { RegistrarUsuario } from '../registrar-usuario/registrar-usuario';
import { MessagesService } from '../../../services/messages/messages';

@Component({
	selector: 'app-consulta-usuarios',
	imports: [CommonModule],
	standalone: true,
	templateUrl: './consulta-usuarios.html',
	styleUrl: './consulta-usuarios.css',
})
export class ConsultaUsuarios implements OnDestroy {
	protected datosTabla: any = [];

	private intervalo: any;

	constructor(
		private modal: ModalService,
		private usuarios: UsuariosService,
		private messages: MessagesService,
		private ch: ChangeDetectorRef
	) { }

	async ngOnInit(): Promise<any> {
		this.messages.mensajeEsperar();

		await this.obtenerListaUsuarios();
		this.repetitiveInstruction();

		this.messages.cerrarMensajes();
	}

	private repetitiveInstruction(): void {
		this.intervalo = setInterval(() => {
			this.obtenerListaUsuarios();
		}, 10000);
	}

	public async obtenerListaUsuarios(): Promise<any> {
		return this.usuarios.obtenerListaUsuarios().toPromise().then(
			respuesta => {
				this.datosTabla = respuesta.usuarios;
				this.ch.markForCheck();
			}
		);
	}

	public abrirModalRegistrarUsuario(pkUsuario: number): void {
		const data: any = {
			pkUsuario: pkUsuario
		};

		this.modal.abrirModalConComponente(RegistrarUsuario, data, 'lg-modal');
	}

	ngOnDestroy(): void {
		clearInterval(this.intervalo);
	}
}