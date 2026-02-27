import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../../../environments/environments';

@Injectable({
	providedIn: 'root',
})
export class TiposServicioService {
	constructor(
		private http: HttpClient
	) { }

	public obtenerListaTipoServicio(): Observable<any> {
		return this.http.get<any>(`${api}/tiposServicio/obtenerListaTipoServicio`)
	}
}
