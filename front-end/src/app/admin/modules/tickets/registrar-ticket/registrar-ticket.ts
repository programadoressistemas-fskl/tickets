import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
export class RegistrarTicket implements OnInit {
  @Input() pkTicket: any = null;

  protected formTicket!: FormGroup;

  protected listaAreas: any[] = [];
  protected listaPlantas: any[] = [];
  protected listaTurnos: any[] = [];
  protected listatiposServicio: any[] = [];

  images: string[] = [];
  files: File[] = [];

  constructor(
    private modal: ModalService,
    private messages: MessagesService,
    private tickets: TiketsService,
    private ch: ChangeDetectorRef,
    private fb: FormBuilder
  ) { }

  async ngOnInit(): Promise<void> {
    this.messages.mensajeEsperar();

    this.crearFormTicket();
    await this.obtenerRecursosRegistroTicket();

    if (this.pkTicket != null) await this.obtenerDetalleTickets(this.pkTicket);

    this.messages.cerrarMensajes();
  }

  private crearFormTicket(): void {
    this.formTicket = this.fb.group({
      id_area: ['', Validators.required],
      id_planta: ['', Validators.required],
      id_turno: ['', Validators.required],
      id_tipo_servicio: ['', Validators.required],
      descripcion_problema: [null, [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]]
    });
  }

  public async obtenerDetalleTickets(pkTicket: number): Promise<void> {
    try {

      const respuesta: any = await this.tickets.obtenerDetalleTickets(pkTicket).toPromise();

      if (!respuesta || !respuesta.ticket) return;

      const ticket = respuesta.ticket;
      const evidencias = respuesta.evidencias || [];

      this.formTicket.get('id_area')?.setValue(ticket.id_area);
      this.formTicket.get('id_planta')?.setValue(ticket.id_planta);
      this.formTicket.get('id_turno')?.setValue(ticket.id_turno);
      this.formTicket.get('id_tipo_servicio')?.setValue(ticket.id_tipo_servicio);
      this.formTicket.get('descripcion_problema')?.setValue(ticket.descripcion_problema);

      this.images = evidencias.map((url: string) => `http://localhost:8000/storage/${url}`);
      this.ch.detectChanges();

    } catch (error) {
      console.error('Error al obtener ticket:', error);
      this.messages.mensajeGenerico('error', 'error');
    }
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
      this.messages.mensajeGenerico('error', 'error');
    }
  }

  onFileSelected(event: any): void {
    const selectedFiles = event.target.files;

    for (let file of selectedFiles) {
      if (!file.type.startsWith('image/')) continue;

      this.files.push(file);

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
    this.files.splice(index, 1);
    this.ch.detectChanges();
  }

  protected registrarTicket(): void {

    if (!this.pkTicket && this.formTicket.invalid) {
      this.messages.mensajeGenerico('Aún hay campos vacíos o inválidos.', 'info', 'Campos requeridos');
      return;
    }

    if (!this.pkTicket) {
      this.pkTicket = true;
      this.messages.mensajeGenerico('Ahora agrega las evidencias', 'info');
      this.ch.detectChanges();
      return;
    }

    if (this.files.length === 0) {
      this.messages.mensajeGenerico('Debes agregar al menos una imagen', 'info');
      return;
    }

    this.messages.mensajeConfirmacionCustom('¿Está seguro de registrar el ticket con evidencias?',
      'question', 'Registrar ticket').then(
        res => {

          if (!res.isConfirmed) return;

          this.messages.mensajeEsperar();

          const formData = new FormData();

          Object.keys(this.formTicket.value).forEach(key => {
            formData.append(key, this.formTicket.value[key]);
          });

          this.files.forEach(file => {
            formData.append('images[]', file);
          });

          this.tickets.registrarTicket(formData).toPromise().then(
            (respuesta: any) => {

              this.obtenerDetalleTickets(respuesta.pkTicket).then(() => {
                this.messages.mensajeGenerico(respuesta.mensaje, 'success', respuesta.title);
              })
              this.messages.mensajeGenerico(respuesta.mensaje, 'success', respuesta.title);

              this.modal.cerrarModal();

            },
            error => {
              this.messages.mensajeGenerico('error', 'error');
            }
          );
        });
  }

  protected actualizarTicket(): void {
    if (this.formTicket.invalid) {
      this.messages.mensajeGenerico('Aún hay campos vacíos o que no cumplen con la estructura correcta.', 'info',
        'Los campos requeridos están marcados con un *');
      return;
    }

    this.messages.mensajeConfirmacionCustom('¿Está seguro de continuar con la actualización del ticket?',
      'question', 'Actualizar ticket').then(
        res => {
          if (!res.isConfirmed) return;
          this.messages.mensajeEsperar();

          const data: any = {
            pkTicket: this.pkTicket,
            ticket: this.formTicket.value
          };

          this.tickets.actualizarTicket(data).toPromise().then(
            respuesta => {
              this.obtenerDetalleTickets(this.pkTicket).then(() => {
                this.messages.mensajeGenerico(respuesta.mensaje, 'success', respuesta.title);
              });
            }, error => {
              this.messages.mensajeGenerico('error', 'error');
            }
          )
        });
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