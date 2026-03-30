import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login/login';
import { MessagesService } from '../../admin/services/messages/messages';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
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
	) {}

	ngOnInit(): void {
		this.crearFormLogin();
	}

	private crearFormLogin(): void {
		this.formLogin = this.fb.group({
			correo: [null, [
				Validators.required,
				Validators.email,
				Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-_:@#$%&+{}()?¿!¡\n]*')
			]],
			password: [null, [
				Validators.required,
				Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-_:@#$%&+{}()?¿!¡\n]*')
			]]
		});
	}

	protected iniciarSesion(): void {

		if (this.formLogin.invalid) {
			this.messages.mensajeGenerico(
				'Aún hay campos vacíos o que no cumplen con la estructura correcta',
				'info',
				'Los campos requeridos están marcados con un *'
			);
			return;
		}

		const credenciales: any = {
			correo_electronico: this.formLogin.value.correo,
			password: this.formLogin.value.password,
		};

		this.messages.mensajeEsperar();

		this.loginService.login(credenciales).toPromise().then(
			(respuesta: any) => {

				if (respuesta.success === 204 || respuesta.success === false) {
					this.messages.mensajeGenerico(
						respuesta.mensaje,
						'warning',
						respuesta.title
					);
					return;
				}

				// 🔐 GUARDAR TOKEN (CLAVE)
				if (respuesta.token) {
					localStorage.setItem('token', respuesta.token);
				}

				this.messages.cerrarMensajes();
				this.router.navigate(['/']);

			},
			error => {
				this.messages.cerrarMensajes();
				this.messages.mensajeGenerico(
					'Ocurrió un error al iniciar sesión',
					'error'
				);
			}
		);
	}
}