import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../services/modal/modal';
import { MessagesService } from '../../../services/messages/messages';
import { TiketsService } from '../../../services/api/tickets/tikets';

@Component({
  selector: 'app-registrar-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-ticket.html',
  styleUrl: './registrar-ticket.css',
})
export class RegistrarTicket {

  @Input() pkTicket: any = null;

  protected formTicket!: FormGroup;

  protected listaAreas: any[] = [];
  protected listaPlantas: any[] = [];
  protected listaTurnos: any[] = [];
  protected listatiposServicio: any[] = [];

  images: string[] = [];

  constructor(
    private modal: ModalService,
    private messages: MessagesService,
    private tickets: TiketsService,
    private ch: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.messages.mensajeEsperar();

    this.crearFormTicket();
    await this.obtenerRecursosRegistroTicket();

    this.messages.cerrarMensajes();
  }

  private crearFormTicket(): void {
    this.formTicket = this.fb.group({
      id_area: ['', Validators.required],
      id_planta: ['', Validators.required],
      id_turno: ['', Validators.required],
      id_tipo_servicio: ['', Validators.required],
      descripcion_problema: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')
        ]
      ]
    });
  }

  private async obtenerRecursosRegistroTicket(): Promise<void> {
    try {
      const respuesta: any = await this.tickets.obtenerRecursosRegistroTicket().toPromise();

      this.listaAreas = respuesta.recursos.listaareas;
      this.listaPlantas = respuesta.recursos.listaplantas;
      this.listaTurnos = respuesta.recursos.listaturnos;
      this.listatiposServicio = respuesta.recursos.listatiposServicio;

      this.ch.detectChanges();
    } catch (error) {
      this.messages.mensajeGenerico('Error al cargar recursos', 'error');
    }
  }

  protected registrarTicket(): void {
    if (this.formTicket.invalid) {
      this.messages.mensajeGenerico(
        'Aún hay campos vacíos o inválidos.',
        'info',
        'Campos requeridos'
      );
      return;
    }

    this.messages.mensajeConfirmacionCustom(
      '¿Está seguro de continuar con el registro del ticket?',
      'question',
      'Registrar ticket'
    ).then(res => {

      if (!res.isConfirmed) return;

      this.messages.mensajeEsperar();

      const ticket: any = this.formTicket.value;

      this.tickets.registrarTicket(ticket).toPromise().then(
        (respuesta: any) => {

          this.pkTicket = respuesta.pkTicket;

          this.messages.mensajeGenerico(
            respuesta.mensaje,
            'success',
            respuesta.title
          );

          this.ch.detectChanges();

        },
        error => {
          this.messages.mensajeGenerico('Error al registrar', 'error');
        }
      );
    });
  }

  onFileSelected(event: any): void {
    const files = event.target.files;

    for (let file of files) {
      if (!file.type.startsWith('image/')) continue;

      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.images.push(e.target.result);
        this.ch.detectChanges();
      };

      reader.readAsDataURL(file);
    }

    event.target.value = '';
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
    this.ch.detectChanges();
  }

  get cambiosForm(): boolean {
    return this.formTicket.dirty || this.images.length > 0;
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