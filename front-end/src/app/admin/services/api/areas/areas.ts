import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AreasService { 
  constructor(
    private http: HttpClient
  ) {}
  
  public obtenerListaAreas(): Observable<any> {
  return this.http.get<any>(`${api}/areas/obtenerListaAreas`);
  }
}
