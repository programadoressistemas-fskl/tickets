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

	public registrarTipoServicio(tiposServicio: any): Observable<any> {
		return this.http.post<any>(`${api}/tiposServicio/registrarTipoServicio`, tiposServicio);
	}

	public obtenerListaTipoServicio(): Observable<any> {
		return this.http.get<any>(`${api}/tiposServicio/obtenerListaTipoServicio`)
	}

	public obtenerDetalleTipoServicio(pkTipoServicio: number): Observable<any> {
		return this.http.get<any>(`${api}/tiposServicio/obtenerDetalleTipoServicio/${pkTipoServicio}`)
	}

	public actualizarTipoServicio(tiposServicio: any): Observable<any> {
		return this.http.put<any>(`${api}/tiposServicio/actualizarTipoServicio`, tiposServicio);
	}
}
