import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from '../messages/messages';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private timeout: any;
  private tiempoInactividad = 60000;

  constructor(
    private router: Router,
    private messages: MessagesService
  ) { }

  iniciarContador() {

    const token = localStorage.getItem('token_tickets_faske');

    if (!token) return;

    if (this.router.url.includes('login')) return;

    clearTimeout(this.timeout);

    this.resetTimer();

    window.addEventListener('mousemove', () => this.resetTimer());
    window.addEventListener('keydown', () => this.resetTimer());
    window.addEventListener('click', () => this.resetTimer());
  }

  resetTimer() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.expirarSesion();
    }, this.tiempoInactividad);
  }

  limpiarSesion() {
    clearTimeout(this.timeout);

    window.removeEventListener('mousemove', () => this.resetTimer());
    window.removeEventListener('keydown', () => this.resetTimer());
    window.removeEventListener('click', () => this.resetTimer());
  }

  expirarSesion() {

    const token = localStorage.getItem('token_tickets_faske');
    if (!token) return;

    localStorage.removeItem('token_tickets_faske');

    this.messages.mensajeGenerico(
      'Tu sesión expiró por inactividad',
      'warning',
      'Sesión expirada'
    );

    this.router.navigate(['/login']);
  }
}