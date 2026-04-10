import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { ModalService } from '../../../services/modal/modal';
import { MessagesService } from '../../../services/messages/messages';
import { TiketsService } from '../../../services/api/tickets/tikets';
import { DropdownComponent } from '../../../components/dropdown/dropdown';

@Component({
  selector: 'app-asignar-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownComponent],
  templateUrl: './asignar-ticket.html',
  styleUrl: './asignar-ticket.css',
})
export class AsignarTicket implements OnInit {

  @Input() pkTicket: any = null;
  @Input() folio: any = null;

  protected formTicket!: FormGroup;
  protected listaUsuarios: any[] = [];

  constructor(
    private modal: ModalService,
    private messages: MessagesService,
    private ch: ChangeDetectorRef,
    private tickets: TiketsService,
    private fb: FormBuilder
  ) { }

  async ngOnInit(): Promise<void> {

    this.formTicket = this.fb.group({
      idUsuario: [[], Validators.required]
    });

    this.messages.mensajeEsperar();

    await this.obtenerUsuariosAsignacion();

    this.messages.cerrarMensajes();
  }

  private async obtenerUsuariosAsignacion(): Promise<void> {
    return this.tickets.obtenerUsuariosAsignacion(this.pkTicket).toPromise().then(
      respuesta => {
        this.listaUsuarios = respuesta.usuarios;
        this.ch.detectChanges();
      }, error => {
        this.messages.mensajeGenerico('error', 'error');
      }
    );
  }

  get usuariosSeleccionados(): any[] {
    return this.listaUsuarios.filter(item => item.checked);
  }

  private getNombresSeleccionados(): string {

    return this.usuariosSeleccionados
      .map(u => u.label)
      .join(', ');
  }

  public asignarTicket(): void {
    const nombres = this.getNombresSeleccionados();
    const esReasignacion = this.pkTicket != null;

    const accion = esReasignacion ? 'reasignar' : 'asignar';
    const titulo = esReasignacion ? 'Reasignar ticket' : 'Asignar ticket';

    this.messages.mensajeConfirmacionCustom(
      `¿Estás seguro de ${accion} el ticket ${this.folio} a ${nombres}?`,
      'question',
      titulo
    ).then(res => {

      if (!res.isConfirmed) return;

      this.messages.mensajeEsperar();

      const data = {
        pkTicket: this.pkTicket,
        idUsuario: this.usuariosSeleccionados.map(item => item.value)
      };

      this.tickets.asignarTicket(data).toPromise().then(
        (respuesta: any) => {

          this.messages.mensajeGenerico(
            respuesta.mensaje,
            'success'
          );

          this.modal.cerrarModal();

        }, error => {

          this.messages.mensajeGenerico(
            error?.error?.mensaje || 'Ocurrió un error',
            'error'
          );
        }
      );

    });
  }

  public cerrarModal(): void {
    this.messages.mensajeConfirmacionCustom(
      '¿Está seguro de cancelar la asignación?',
      'question',
      'Cancelar asignación'
    ).then(res => {
      if (!res.isConfirmed) return;
      this.modal.cerrarModal();
    });
  }
}