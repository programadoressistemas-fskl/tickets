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

  public registrarTicket(ticket: any): Observable<any> {
    return this.http.post<any>(`${api}/tickets/registrarTicket`, ticket);
  }

  public obtenerRecursosRegistroTicket(): Observable<any> {
    return this.http.get<any>(`${api}/tickets/obtenerRecursosRegistroTicket`);
  }
}
