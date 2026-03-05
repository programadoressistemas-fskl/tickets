import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal/modal';
import { MessagesService } from '../../../../services/messages/messages';
import { PlantasService } from '../../../../services/api/plantas/plantas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-planta',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './registrar-planta.html',
  styleUrl: './registrar-planta.css',
})
export class RegistrarPlanta {
  @Input() pkPlanta: any = null;

  protected formPlanta!: FormGroup;

  constructor(
    private modal: ModalService,
    private fb: FormBuilder,
    private messages: MessagesService,
    private plantas: PlantasService
  ) { }

  async ngOnInit(): Promise<any> {
    this.messages.mensajeEsperar();

    this.crearFormPlanta();

    if (this.pkPlanta != null) await this.obtenerDetallePlanta(this.pkPlanta);

    this.messages.cerrarMensajes();
  }

  private crearFormPlanta(): void {
    this.formPlanta = this.fb.group({
      planta: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
      abrev: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
      direccion: [null, [Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
    })
  }  

  public async obtenerDetallePlanta(pkPlanta: number): Promise<any> {
		return this.plantas.obtenerDetallePlanta(pkPlanta).toPromise().then(
			respuesta => {
				const planta = respuesta.planta;

				this.formPlanta.get('planta')?.setValue(planta.planta);
				this.formPlanta.get('abrev')?.setValue(planta.abrev);
				this.formPlanta.get('direccion')?.setValue(planta.direccion);
			}
		)
	}

  protected registrarPlanta(): void {
    if (this.formPlanta.invalid) {
      this.messages.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura correcta.', 'info', 'Los campos requeridos están marcados con un *');
      return;
    }

    this.messages.mensajeConfirmacionCustom('¿Está seguro de continuar con el registro de planta?',
      'question', 'Registrar planta').then(
        res => {
          if (!res.isConfirmed) return;

          const planta: any = this.formPlanta.value;

          this.plantas.registrarPlanta(planta).toPromise().then(
            respuesta => {
              this.messages.mensajeGenerico(respuesta.mensaje, 'success', respuesta.title);
            }, error => {
              this.messages.mensajeGenerico('error', 'error');
            }
          )
        }
      )
  }

  public cerrarModal(): void {
    this.modal.cerrarModal();
  }
}
