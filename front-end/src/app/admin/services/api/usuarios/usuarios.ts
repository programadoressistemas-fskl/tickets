import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../../../environments/environments';

@Injectable({
	providedIn: 'root',
})
export class UsuariosService {
	constructor(
		private http: HttpClient
	) { }

	public obtenerListaUsuarios(): Observable<any> {
		return this.http.get<any>(`${api}/usuarios/obtenerListaUsuarios`);
	}
}
