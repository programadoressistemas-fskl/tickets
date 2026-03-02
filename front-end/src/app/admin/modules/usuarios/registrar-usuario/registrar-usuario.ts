import { ChangeDetectorRef, Component } from '@angular/core';
import { ModalService } from '../../../services/modal/modal';
import { CommonModule } from '@angular/common';
import { AreasService } from '../../../services/api/areas/areas';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
	selector: 'app-registrar-usuario',
	imports: [CommonModule, ReactiveFormsModule],
	standalone: true,
	templateUrl: './registrar-usuario.html',
	styleUrl: './registrar-usuario.css',
})
export class RegistrarUsuario {
	protected formUsuario!: FormGroup;

	protected listaAreas: any[] = [];

	constructor(
		private modal: ModalService,
		private areas: AreasService,
		private ch: ChangeDetectorRef,
		private fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.crearFormUsuario();
		this.obtenerListaAreas();
	}

	private crearFormUsuario(): void {
		this.formUsuario = this.fb.group({
			nombre:    [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
			a_paterno: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
			a_materno: [null, [Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
			correo:    [null, [Validators.required, Validators.email ,Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-_@#$%&+{}()?¿!¡\n\r\t]*')]], 
			telefono:  [null, [Validators.pattern('^[0-9]+(\.[0-9]+)?$'), Validators.minLength(10), Validators.maxLength(10)]],
			password:  [null, [Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-_@#$%&+{}()?¿!¡\n\r\t]*')]],
			id_area:   ['', [Validators.required]],
			puesto:    [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-_@#$%&+{}()?¿!¡\n\r\t]*')]]
		});
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