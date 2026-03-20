import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../services/modal/modal';
import { MessagesService } from '../../../services/messages/messages';
import { TiketsService } from '../../../services/api/tickets/tikets';
 
@Component({
  selector: 'app-registrar-ticket',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './registrar-ticket.html',
  styleUrl: './registrar-ticket.css',
})
export class RegistrarTicket {
  @Input() pkTicket: any = null;

  protected formTicket!: FormGroup;

  protected listaAreas:         any[] = [];
  protected listaPlantas:       any[] = [];
  protected listaTurnos:        any[] = [];
  protected listatiposServicio: any[] = [];

  constructor(
    private modal:    ModalService,
    private messages: MessagesService,
    private tickets:  TiketsService,
    private ch:       ChangeDetectorRef,
    private fb:       FormBuilder
  ) { }

  async ngOnInit(): Promise<any> {
    this.messages.mensajeEsperar();

    this.crearFormTicket();
    await this.obtenerRecursosRegistroTicket();

    this.messages.cerrarMensajes();
  }

  private crearFormTicket(): void {
    this.formTicket = this.fb.group({
      id_area:              ['', [Validators.required]],
      id_planta:            ['', [Validators.required]],
      id_turno:             ['', [Validators.required]],
      id_tipo_servicio:     ['', [Validators.required]],
      descripcion_problema: [null, [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]]
    });
  }

  private async obtenerRecursosRegistroTicket(): Promise<any> {
    return this.tickets.obtenerRecursosRegistroTicket().toPromise().then(
      respuesta => {
        this.listaAreas         = respuesta.recursos.listaareas;
        this.listaPlantas       = respuesta.recursos.listaplantas;
        this.listaTurnos        = respuesta.recursos.listaturnos;
        this.listatiposServicio = respuesta.recursos.listatiposServicio
        this.ch.markForCheck();
      }
    );
  }

  protected registrarTicket(): void {
    if (this.formTicket.invalid) {
      this.messages.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura correcta.',
        'info', 'Los campos requeridos están marcados con un *'
      );
      return;
    }

    this.messages
      .mensajeConfirmacionCustom('¿Está seguro de continuar con el registro del área?',
        'question', 'Registrar área').then(res => {

          if (!res.isConfirmed) return;
          this.messages.mensajeEsperar();

          const ticket: any = this.formTicket.value;

          this.tickets.registrarTicket(ticket).toPromise().then(
            respuesta => {

              this.pkTicket = respuesta.pkTicket;
              this.messages.mensajeGenerico(respuesta.mensaje, 'success', respuesta.title)
              this.ch.markForCheck();
            }, error => {
              this.messages.mensajeGenerico('error', 'error');
            }
          )
        })
  }

  get cambiosForm(): boolean {
    return this.formTicket.dirty;
  }

  public cerrarModal(): void {
    if (!this.cambiosForm) {
      this.modal.cerrarModal();
      return;
    }

    this.messages.mensajeConfirmacionCustom(
      '¿Está seguro de cerrar sin guardar cambios?',
      'question',
      'Cancelar registro'
    ).then(res => {
      if (!res.isConfirmed) return;

      this.modal.cerrarModal();
    });
  }

}
