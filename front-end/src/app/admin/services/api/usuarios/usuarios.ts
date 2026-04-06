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

	public registrarUsuario(usuario: any): Observable<any> {
		return this.http.post<any>(`${api}/usuarios/registrarUsuario`, usuario);
	}

	public obtenerListaUsuarios(): Observable<any> {
		return this.http.get<any>(`${api}/usuarios/obtenerListaUsuarios`);
	}

	public obtenerDetalleUsuario(pkUsuario: number): Observable<any> {
		return this.http.get<any>(`${api}/usuarios/obtenerDetalleUsuario/${pkUsuario}`);
	}

	public actualizarUsuario(usuario: any): Observable<any> {
		return this.http.put<any>(`${api}/usuarios/actualizarUsuario`, usuario);
	}

	public cambiarStatusUsuario(id: number): Observable<any> {
		return this.http.get<any>(`${api}/usuarios/cambiarStatusUsuario/${id}`)
	}

	public cerrarSesion(): Observable<any> {
		return this.http.post<any>(`${api}/usuarios/cerrarSesion`, {});
	}
}
