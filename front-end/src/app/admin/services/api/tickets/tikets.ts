import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class TiketsService {
  constructor(
    private http: HttpClient
  ) { }

  public registrarTicket(formData: FormData): Observable<any> {
    return this.http.post<any>(`${api}/tickets/registrarTicket`, formData);
  }

  public obtenerRecursosRegistroTicket(): Observable<any> {
    return this.http.get<any>(`${api}/tickets/obtenerRecursosRegistroTicket`);
  }

  public obtenerStatusTickets(): Observable<any> {
    return this.http.get<any>(`${api}/tickets/obtenerStatusTickets`);
  }

  public obtenerListaGeneralTickets(data: any): Observable<any> {
    return this.http.post<any>(`${api}/tickets/obtenerListaGeneralTickets`, data);
  }

  public obtenerDetalleTicket($pkTicket: number): Observable<any> {
    return this.http.get<any>(`${api}/tickets/obtenerDetalleTicket/${$pkTicket}`,);
  }

  public actualizarTicket(formData: FormData): Observable<any> {
    return this.http.post<any>(`${api}/tickets/actualizarTicket`, formData);
  }

  public eliminarEvidenciaTicket(id_ticket_evidencia: number): Observable<any> {
    return this.http.delete<any>(`${api}/tickets/eliminarEvidenciaTicket/${id_ticket_evidencia}`);
  }

  public cancelarTicket(id: number): Observable<any> {
    return this.http.post<any>(`${api}/tickets/cancelar/${id}`, {});
  }

  public obtenerUsuariosAsignacion(): Observable<any> {
    return this.http.get<any>(`${api}/tickets/obtenerUsuariosAsignacion`);
  }

  public asignarTicket(data: any): Observable<any> {
    return this.http.post<any>(`${api}/tickets/asignarTicket`, data);
  }
}
