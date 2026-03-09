import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../../../environments/environments';

@Injectable({
	providedIn: 'root',
})
export class TurnosService {
	constructor(
		private http: HttpClient
	) { }

	public registrarTurno(turno: any): Observable<any> {
		return this.http.post<any>(`${api}/turnos/registrarTurno`, turno);
	}

	public obtenerListaTurnos(): Observable<any> {
		return this.http.get<any>(`${api}/turnos/obtenerListaTurnos`);
	}

	public obtenerDetalleTurno(pkTurno: number): Observable<any> {
		return this.http.get<any>(`${api}/turnos/obtenerDetalleTurno/${pkTurno}`);
	}

	public actualizarTurno(turno: any): Observable<any> {
		return this.http.put<any>(`${api}/turnos/actualizarTurno`, turno);
	}
}
