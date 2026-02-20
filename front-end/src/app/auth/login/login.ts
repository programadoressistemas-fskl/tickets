import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { LoginService } from '../services/login/login';
import { MessagesService } from '../../admin/services/messages/messages';
import { Router } from '@angular/router';
@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
	templateUrl: './login.html',
	styleUrl: './login.css',
})
export class Login implements OnInit {
	protected formLogin!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private loginService: LoginService,
		private messages: MessagesService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.crearFormLogin();
	}

	private crearFormLogin(): void {
		this.formLogin = this.fb.group({
			correo: [null, [Validators.required, Validators.email, Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-_:@#$%&+{}()?¿!¡\n]*')]],
			password: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-_:@#$%&+{}()?¿!¡\n]*')]]
		});
	}

	protected iniciarSesion(): void {
		if (this.formLogin.invalid) {
			this.messages.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura corecta', 'info', 'Los campos requeridos están marcados con un *');
			return;
		}

		const credenciales: any = {
			correo_electronico: this.formLogin.value.correo,
			password: this.formLogin.value.password,
		}

		this.messages.mensajeEsperar();

		this.loginService.login(credenciales).toPromise().then(
			respuesta => {
				if (respuesta.success == 204) {
					this.messages.mensajeGenerico(respuesta.mensaje, 'warning', respuesta.title);
					return;
				}
				this.router.navigate(['/']);
				this.messages.cerrarMensajes();
			}, error => {
				if (!navigator.onLine){
					this.messages.mensajeGenerico('No ay conexion a internet', 'warning', 'Upss...!');
				} else {
					this.messages.mensajeGenerico('error', 'error');
				}

			}
		)
	}
}
