import { Component, Input, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../services/modal/modal';
import { MessagesService } from '../../../services/messages/messages';

@Component({
  selector: 'app-evidencia-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evidencia-tickets.html',
  styleUrl: './evidencia-tickets.css',
})
export class EvidenciaTickets {

  @Input() pkTicket: any = null;

  images: string[] = [];

  constructor(
    private modal: ModalService,
    private messages: MessagesService,
    private zone: NgZone
  ) { }

  onFileSelected(event: any) {
    const files = event.target.files;

    for (let file of files) {
      if (!file.type.startsWith('image/')) continue;

      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.zone.run(() => {
          this.images.push(e.target.result);
        });
      };

      reader.readAsDataURL(file);
    }

    event.target.value = '';
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  get cambiosForm(): boolean {
    return this.images.length > 0;
  }

  cerrarModal(): void {
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