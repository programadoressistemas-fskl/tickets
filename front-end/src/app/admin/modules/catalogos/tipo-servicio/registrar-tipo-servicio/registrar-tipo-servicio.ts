import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  @Input() pkTipoServicio: any = null;

  protected formTipoServicio!: FormGroup;

  constructor(
    private modal: ModalService,
    private tiposServicio: TiposServicioService,
    private fb: FormBuilder,
    private messages: MessagesService
  ) { }

  async ngOnInit(): Promise<any> {
    this.messages.mensajeEsperar();

    this.crearFormTipoServicio();
    if (this.pkTipoServicio != null) await this.obtenerDetalleTipoServicio(this.pkTipoServicio);

    this.messages.cerrarMensajes();
  }

  private crearFormTipoServicio(): void {
    this.formTipoServicio = this.fb.group({
      tipo_servicio: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]],
      descripcion: [null, [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú ]*')]]
    })
  }


  public async obtenerDetalleTipoServicio(pkTipoServicio: number): Promise<any> {
    return this.tiposServicio.obtenerDetalleTipoServicio(pkTipoServicio).toPromise().then(
      respuesta => {
        const tipoServicio = respuesta.tipoServicio;

        this.formTipoServicio.get('tipo_servicio')?.setValue(tipoServicio.tipo_servicio);
        this.formTipoServicio.get('descripcion')?.setValue(tipoServicio.descripcion);
      }
    )
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
