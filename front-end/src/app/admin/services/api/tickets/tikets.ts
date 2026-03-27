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

  public obtenerDetalleTickets($pkTicket: number): Observable<any> {
    return this.http.get<any>(`${api}/tickets/obtenerDetalleTickets/${$pkTicket}`,);
  }

  public actualizarTicket(ticket: any): Observable<any> {
    return this.http.put<any>(`${api}/usuarios/actualizarUsuario`, ticket);
  }
}
