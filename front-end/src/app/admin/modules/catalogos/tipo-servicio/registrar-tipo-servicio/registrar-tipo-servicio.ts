import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal/modal';
import { TiposServicioService } from '../../../../services/api/tipos-servicio/tipos-servicio';
import { MessagesService } from '../../../../services/messages/messages';

@Component({
  selector: 'app-registrar-tipo-servicio',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './registrar-tipo-servicio.html',
  styleUrl: './registrar-tipo-servicio.css',
})
export class RegistrarTipoServicio {
  protected formTipoServicio!: FormGroup;

  constructor(
    private modal: ModalService,
    private tiposServicio: TiposServicioService,
    private fb: FormBuilder,
    private messages: MessagesService
  ) { }

  ngOnInit(): void {
    this.crearFormTipoServicio();
  }

  private crearFormTipoServicio(): void {
    this.formTipoServicio = this.fb.group({
      tipo_servicio: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
      descripcion: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]]
    })
  }

  protected registrarTipoServicio(): void {
    if (this.formTipoServicio.invalid) {
      this.messages.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura correcta.', 'info', 'Los campos requeridos están marcados con un *');
      return;
    }

    this.messages.mensajeConfirmacionCustom('¿Está seguro de continuar con el registro del tipo servicio?',
      'question', 'Registrar tipo servicio').then(
        res => {
          if (!res.isConfirmed) return;

          const tiposServicio: any = this.formTipoServicio.value;

          this.tiposServicio.registrarTipoServicio(tiposServicio).toPromise().then(
            respuesta => {
              this.messages.mensajeGenerico(respuesta.mensaje, 'success', respuesta.title);
            }, error => {
              this.messages.mensajeGenerico('error', 'error');
            }
          );
        }
      )
  }

  public cerrarModal(): void {
    this.modal.cerrarModal();
  }

}
