import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { ModalService } from '../../../services/modal/modal';
import { MessagesService } from '../../../services/messages/messages';
import { TiketsService } from '../../../services/api/tickets/tikets';

@Component({
  selector: 'app-asignar-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './asignar-ticket.html',
  styleUrl: './asignar-ticket.css',
})
export class AsignarTicket implements OnInit {

  @Input() pkTicket: any = null;

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
    try {
      const respuesta: any = await firstValueFrom(
        this.tickets.obtenerUsuariosAsignacion()
      );

      this.listaUsuarios = respuesta.usuarios;
      this.ch.detectChanges();

    } catch (error) {
      this.messages.mensajeGenerico('error', 'error');
    }
  }

  public asignarTicket(): void {
    this.messages.mensajeConfirmacionCustom(
      '¿Está seguro de asignar el ticket?',
      'question',
      'Asignar ticket'
    ).then(res => {

      if (!res.isConfirmed) return;

      this.messages.mensajeEsperar();

      const data = {
        pkTicket: this.pkTicket,
        idUsuario: this.formTicket.value.idUsuario
      };

      this.tickets.asignarTicket(data).toPromise().then(
        (respuesta: any) => {

          this.messages.mensajeGenerico(
            respuesta.mensaje,
            'success'
          );

          this.modal.cerrarModal();

        }, error => {
          
          this.messages.mensajeGenerico('error', 'error');
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