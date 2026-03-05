import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../../../environments/environments';

@Injectable({
	providedIn: 'root',
})
export class PlantasService {
	constructor(
		private http: HttpClient
	) { }

	public registrarPlanta(planta: any): Observable<any> {
		return this.http.post<any>(`${api}/plantas/registrarPlanta`, planta);
	}

	public obtenerListaPlantas(): Observable<any> {
		return this.http.get<any>(`${api}/plantas/obtenerListaPlantas`);
	}

	public obtenerDetallePlanta(pkPlanta: number): Observable<any> {
		return this.http.get<any>(`${api}/plantas/obtenerDetallePlanta/${pkPlanta}`);
	}

}
